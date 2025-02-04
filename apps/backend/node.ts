import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import Redis from 'ioredis'; // Import ioredis
import {
  checkFileExists,
  getFilesandMeta,
  sortPhotosByCollectionId,
} from './helpers';
import {
  getFileFromUrl,
  updatePicMetadata,
  updateCollectionCoverUrl,
  updateCollectionFields,
} from './helpers/getFilesandMeta';
import { swapHomeDisplayNode } from './helpers/adminAction';
import { adminStorage } from './firebaseAdmin';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { CollectionFormData, CollectionType } from '@film/photos-iso';
import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from '@clerk/clerk-sdk-node';

import 'dotenv/config';
import { memoize } from './helpers/memo';

// 09/18 Update requires an firestore key. Break if not found
checkFileExists().catch((error) => {
  throw new Error(
    `\x1b[1m\x1b[31m(Backend Error) Firestore Service Key Missing\x1b[0m`
  );
});

const redisClient = new Redis();
redisClient.on('error', (err) => {
  throw new Error(
    `\x1b[1m\x1b[31m(Backend Error) Redis connection failed, check if Brew is running, or contact the backend team\x1b[0m`
  );
});

redisClient.on('ready', () => console.log('Redis connected'));
const cacheKey = 'photos';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where the uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Rename the file to include the original name and a timestamp
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFilesandMetaMemoized = memoize(getFilesandMeta, 3600000); // 1 hour TTL

export async function createFilmServer() {
  const node = express();
  node.use(cors());
  node.use(bodyParser.json({ limit: '30mb' }));
  node.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

  // ---------------------------
  // GET /photos - expensive route
  // ---------------------------
  node.get('/photos', async (req, res) => {
    try {
      // Check for cached photos from Redis
      const cachedPhotos = await redisClient.get(cacheKey);
      if (cachedPhotos) {
        console.log('from cached photos');
        return res.json(JSON.parse(cachedPhotos));
      }

      // Use memoized Firestore fetch if Redis cache is empty
      const photos = await getFilesandMetaMemoized();
      // Cache the photos in Redis for 1 hour (3600 seconds)
      await redisClient.setex(cacheKey, 3600, JSON.stringify(photos));
      return res.json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).send('Error fetching photos');
    }
  });

  // ---------------------------
  // POST /admin/update/collection/form-data - update collection form data
  // ---------------------------
  node.post(
    '/admin/update/collection/form-data',
    ClerkExpressRequireAuth(),
    async (req, res) => {
      try {
        const changedFields: Partial<CollectionFormData> = req.body.editedData;
        const ref: CollectionType = req.body.ref;

        if (!changedFields || Object.keys(changedFields).length === 0 || !ref) {
          return res.status(400).json({ error: 'No fields to update' });
        }

        await updateCollectionFields(ref, changedFields);

        // await redisClient.del(`collection:${ref.id}`);

        res.status(200).json({
          message: 'Collection Fields updated',
        });
      } catch (error) {
        console.error('Error updating collection form:', error);
        res.status(500).json({ error: 'Failed to update collection' });
      }
    }
  );

  node.post(
    '/admin/update/collection/cover',
    ClerkExpressRequireAuth(),
    upload.single('imageFile'),
    async (req, res) => {
      try {
        const ref: CollectionType = req.body.ref;
        const file = req.file;

        if (!file || !ref) {
          return res.status(400).json({ error: 'No file or ref uploaded' });
        }

        // Upload the file to Firebase Storage
        const filePath = path.join(__dirname, file.path);
        const firebaseFileName = `uploads/${file.filename}`;

        await adminStorage.upload(filePath, {
          destination: firebaseFileName, // File path in Firebase Storage
          metadata: {
            contentType: file.mimetype, // Ensure the file's content type is set correctly
          },
        });

        // Delete the file from the local server after upload
        fs.unlinkSync(filePath);

        // Generate a signed URL for the uploaded file
        const [signedUrl] = await adminStorage
          .file(firebaseFileName)
          .getSignedUrl({
            action: 'read', // Action can be 'read', 'write', or 'delete'
            expires: Date.now() + 60 * 60 * 1000, // URL will expire in 1 hour
          });

        updateCollectionCoverUrl(ref, signedUrl);

        // Response with signed URL
        res.status(200).json({
          message: 'Image Url updated successfully',
          // fileUrl: signedUrl, // Temporary signed URL to access the file
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
      }
    }
  );

  node.post(
    '/admin/update/display',
    // ClerkExpressRequireAuth(),
    async (req, res) => {
      if (!req.body.urls) {
        return res.status(400).send({ error: 'No data provided' });
      }
      const newFile = getFileFromUrl(req.body.urls.newUrl);
      const oldFile = getFileFromUrl(req.body.urls.oldUrl);

      swapHomeDisplayNode(oldFile, newFile, res);
    }
  );

  node.get('/collections/:collection', async (req, res) => {
    const { collection } = req.params;
    const collectionCacheKey = `collection:${collection}`;

    try {
      // Try to get cached data for this collection
      const cachedCollection = await redisClient.get(collectionCacheKey);
      if (cachedCollection) {
        return res.json(JSON.parse(cachedCollection));
      }

      // If not in cache, get full photos data using memoization
      const photos = await getFilesandMetaMemoized();
      // Sort photos by collection id
      const collectionPhotos = await sortPhotosByCollectionId(
        photos,
        res,
        collection
      );

      // Cache the result for this collection (TTL = 1 hour)
      await redisClient.setex(
        collectionCacheKey,
        3600,
        JSON.stringify(collectionPhotos)
      );
      return res.json(collectionPhotos);
    } catch (error) {
      console.error('Error fetching collection data:', error);
      res.status(500).send('Error fetching collection data');
    }
  });
  node.post('/download/', async (req, res) => {
    if (!req.body.url) {
      return res.status(400).send({ error: 'No data provided' });
    }

    try {
      const imageUrl = req.body.url;

      if (!imageUrl) {
        return res.status(404).send({ message: 'Image not found' });
      }

      const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
      });

      res.setHeader(
        'Content-Disposition',
        'attachment; filename="downloaded-image.jpeg"'
      );
      res.setHeader('Content-Type', 'image/jpeg');
      response.data.pipe(res);
    } catch (error) {
      console.error('Failed to download image:', error);
      res.status(500).send({ message: 'Failed to download image' });
    }
  });

  const PORT = process.env.PORT || 8080;
  node.listen(PORT, () => {
    console.log('\x1b[32m\x1b[1mBackend listening on port %d!🚀\x1b[0m', PORT);
  });

  return node;
}

createFilmServer().catch((error) => {
  console.error('Failed to start server:', error);
});

export { redisClient };

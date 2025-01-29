import { CollectionController } from './source';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getPhotoViaId } from './source/controllers/DownloadImage';
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
import {
  changeCollectionCoverBackend,
  swapHomeDisplayNode,
} from './helpers/adminAction';
import { adminStorage } from './firebaseAdmin';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { db } from './db';
import { CollectionFormData, CollectionType } from '@film/photos-iso';
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

export async function createFilmServer() {
  const node = express();
  node.use(cors());
  node.use(bodyParser.json({ limit: '30mb' }));
  node.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

  node.get('/photos', async (req, res) => {
    try {
      // // Try to get cached data from Redis
      const cachedPhotos = await redisClient.get(cacheKey);

      if (cachedPhotos) {
        return res.json(JSON.parse(cachedPhotos));
      }

      const photos = await getFilesandMeta();

      redisClient.setex(cacheKey, 3600, JSON.stringify(photos));
      return res.json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).send('Error fetching photos');
    }
  });

  node.post('/collections/update', async (req, res) => {
    if (!req.body.url) {
      return res.status(400).send({ error: 'No data provided' });
    }
    if (!req.body.collection) {
      return res.status(400).send({ error: 'No data provided' });
    }

    if (!req.body.oldMeta) {
      return res.status(400).send({ error: 'No data provided' });
    }

    if (!req.body.current) {
      return res.status(400).send({ error: 'No data provided' });
    }

    if (!req.body.removeFromCurrent) {
      return res.status(400).send({ error: 'No data provided' });
    }

    return updatePicMetadata(
      res,
      req.body.url,
      req.body.collection,
      req.body.oldMeta,
      req.body.current,
      req.body.removeFromCurrent
    );
  });

  node.post('/admin/update/collection/form-data', async (req, res) => {
    try {
      const changedFields: Partial<CollectionFormData> = req.body.editedData;
      const ref: CollectionType = req.body.ref;

      if (!changedFields || Object.keys(changedFields).length === 0 || !ref) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      updateCollectionFields(ref, changedFields);
    } catch (error) {
      console.error('Error updataing collection form:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

  node.post(
    '/admin/update/collection/cover',
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

  node.post('/admin/update/display', async (req, res) => {
    if (!req.body.urls) {
      return res.status(400).send({ error: 'No data provided' });
    }
    const newFile = getFileFromUrl(req.body.urls.newUrl);
    const oldFile = getFileFromUrl(req.body.urls.oldUrl);

    swapHomeDisplayNode(oldFile, newFile, res);
  });

  node.get('/collections/:collection', async (req, res) => {
    const { collection } = req.params;

    try {
      const cachedPhotos = await redisClient.get(cacheKey);

      if (cachedPhotos) {
        return await sortPhotosByCollectionId(
          JSON.parse(cachedPhotos),
          res,
          collection
        );
      }

      const photos = await getFilesandMeta();
      redisClient.setex(cacheKey, 3600, JSON.stringify(photos));
      return await sortPhotosByCollectionId(photos, res, collection);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).send('Error fetching photos');
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

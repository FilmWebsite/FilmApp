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
import { updatePicMetadata } from './helpers/getFilesandMeta';

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

export async function createFilmServer() {
  const node = express();
  node.use(cors());
  node.use(bodyParser.json({ limit: '30mb' }));
  node.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

  node.get('/photos', async (req, res) => {
    try {
      // Try to get cached data from Redis
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

  node.get('/download/:image_id/', async (req, res) => {
    const { image_id } = req.params;
    try {
      const imageUrl = await getPhotoViaId(image_id);
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

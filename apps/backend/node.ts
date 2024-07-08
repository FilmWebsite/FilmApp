// NOTE: DO NOT REMOVE THESE IMPORTS
import tf from '@tensorflow/tfjs-node-gpu'; // this loads tensorflow for speed optimization
import faceapi from '@vladmandic/face-api/dist/face-api.node-gpu.js'; // this loads face-api version with correct bindings for tfjs-node-gpu

import {
  QueryResolver,
  GQLContext,
  PostgresPhotoStore,
  PhotoLoader,
  CollectionController,
  PhotoUrlController,
} from './source';
import { mergeSchemas } from '@graphql-tools/schema';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import _ from 'lodash';
import bodyParser from 'body-parser';
import pkg from 'pg';
import cors from 'cors';
import { getPhotoViaId } from './source/controllers/DownloadImage';
import axios from 'axios';
// import * as faceapi from 'face-api.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import { promises as fs } from 'fs'; // Import fs.promises
import { Canvas, Image, ImageData, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PATH = '/graphql';

// Configure face-api.js to use the canvas implementation
faceapi.env.monkeyPatch({
  // @ts-ignore
  Canvas: Canvas,
  // @ts-ignore
  Image: Image,
  // @ts-ignore
  ImageData: ImageData,
});

export function mergeModulesSchemaWith(mergeIn: any) {
  return mergeSchemas({
    ...mergeIn,
  });
}

async function getSingleFace(imagePath: string) {
  try {
    const buffer = await fs.readFile(imagePath); // Read file asynchronously into buffer
    const image = await loadImage(buffer); // Load image using node-canvas

    // Detect only one face
    const detections = await faceapi
      // @ts-ignore
      .detectSingleFace(image)
      .withFaceLandmarks()
      .withFaceDescriptor();

    return detections;
  } catch (error) {
    console.error('Error detecting faces:', error);
    throw error; // Propagate the error to handle it upstream
  }
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()); // Set the filename of the uploaded file
  },
});

// Initialize Multer upload middleware
const upload = multer({ storage: storage });

const getPool = () => {
  const { Pool } = pkg;
  const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'film',
    password: '',
    port: 5000,
  });
  return pool;
};

const pool = getPool();

export const configServer = _.memoize(async () => {
  const typeDefs = readFileSync('./source/schema.graphql', 'utf8');

  const schema = mergeModulesSchemaWith({
    typeDefs,
    resolvers: {
      Query: QueryResolver,
      //   Mutation: MutationResolver,
    },
  });

  const server = new ApolloServer({
    schema,
    context: (): GQLContext => {
      const postgresPhotoStore = new PostgresPhotoStore(pool);
      const photos = new PhotoLoader(postgresPhotoStore);
      return {
        photos,
      };
    },
  });

  await server.start();

  return server;
});

async function createFilmServer(app: any) {
  const server = await configServer();
  server.applyMiddleware({
    app,
    path: PATH,
  });
}

const initFaceApi = async () => {
  const MODEL_URL = path.join(__dirname, '/models');
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
};

initFaceApi()
  .then(() => {
    const node: Application = express();
    node.use(cors());
    node.use(bodyParser.json({ limit: '30mb' }));
    node.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

    // Endpoint to handle image upload, face detection, and comparison
    node.post(
      '/upload-image-for-processing',
      upload.single('image'),
      async (req, res) => {
        try {
          // @ts-ignore
          const imagePath = req.file.path; // Path to the uploaded image file
          const single = await getSingleFace(imagePath); // Detect faces in the uploaded image

          const faceToCheckAgaisnt = single?.descriptor;

          const urls = await PhotoUrlController();

          // Remove from object
          //  TODO: REMOVE SLICING
          const photoUrls = urls.map((url) => url.image_url);
          // const photoUrls = [
          //   'https://doron-photo-app.s3.amazonaws.com/quicktripsPics/nine.JPG',
          // ];

          // Example modification in your async function handling image comparison
          const results = await Promise.all(
            photoUrls.map(async (photoUrl) => {
              try {
                const response = await axios.get(photoUrl, {
                  responseType: 'arraybuffer',
                });

                const photoBuffer = Buffer.from(response.data, 'binary');
                const otherImg = await loadImage(photoBuffer); // Load image using node-canvas

                // Detect faces in the fetched image
                const otherDetections = await faceapi
                  // @ts-ignore
                  .detectAllFaces(otherImg)
                  .withFaceLandmarks()
                  .withFaceDescriptors();

                // Compare each detected face in otherDetections with the mainDetection
                const matches = otherDetections.map((detection) => {
                  const distance = faceapi.euclideanDistance(
                    // @ts-ignore
                    faceToCheckAgaisnt,
                    detection.descriptor
                  );

                  return { detection, distance };
                });

                const hasMatches = matches.some(
                  (match) => match.distance < 0.5
                );

                if (hasMatches) {
                  return photoUrl; // Return the photoUrl if matches are found
                } else {
                  return null; // Return null if no matches are found
                }
              } catch (error) {
                console.error(`Error processing ${photoUrl}:`, error);
                return null; // Return null for failed comparisons
              }
            })
          );

          const matchedUrls = results.filter((url) => url !== null);
          res.status(200).json({ matchedUrls });
        } catch (error) {
          console.error('Error processing image:', error);
          res.status(500).json({ message: 'Failed to process image.' });
        }
      }
    );

    node.get('/', async (req, res) => {
      return res.redirect('/graphql');
    });

    node.post('/collections/:collection', async (req, res) => {
      const { collection } = req.params;
      // @ts-ignore
      const data = await CollectionController(collection);
      if (data) {
        return res.status(200).send({ collection: data });
      } else {
        return {};
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
          // TODO: output a photo name for users
          'attachment; filename="downloaded-image.jpeg"'
        );
        res.setHeader('Content-Type', 'image/jpeg');

        response.data.pipe(res);
      } catch (error) {
        console.error('Failed to download image:', error);
        res.status(500).send({ message: 'Failed to download image' });
      }
    });

    createFilmServer(node).then(() => {
      const PORT = process.env.PORT || 8080;
      node.listen(PORT, () => {
        console.log(`Listening on port ${PORT}! 🚀`);
      });
    });
  })
  .catch((err) => {
    console.error('Error initializing Face API:', err);
    process.exit(1); // Exit the process if Face API initialization fails
  });

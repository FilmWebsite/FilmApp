import {
  QueryResolver,
  MutationResolver,
  GQLContext,
  PostgresPhotoStore,
  PhotoLoader,
  CollectionController,
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

const PATH = '/graphql';
export function mergeModulesSchemaWith(mergeIn: any) {
  return mergeSchemas({
    ...mergeIn,
  });
}

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

export async function createFilmServer(app: any) {
  const server = await configServer();
  server.applyMiddleware({
    app,
    path: PATH,
  });
}

const node = express();
node.use(cors());
node.use(bodyParser.json({ limit: '30mb' }));
node.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

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
  node.listen(PORT);
  console.log('Listening on port 8080!🚀');
});

export { node };

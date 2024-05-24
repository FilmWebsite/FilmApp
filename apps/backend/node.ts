import { QueryResolver, MutationResolver, GQLContext } from './source';
import { mergeSchemas } from '@graphql-tools/schema';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import _ from 'lodash';
import bodyParser from 'body-parser';
import { mergeModulesSchemaWith, pool as pg } from '@film/postgres-api';

const PATH = '/graphql';

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
      return {};
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
node.use(bodyParser.json({ limit: '30mb' }));
node.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

node.get('/', async (req, res) => {
  return res.redirect('/graphql');
});

createFilmServer(node).then(() => {
  const PORT = 3002;
  node.listen(PORT);
  console.log('Backend successfully starting listening to node 🚀');
});

export { node };

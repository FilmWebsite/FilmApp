import pkg from 'pg';
import { mergeSchemas } from '@graphql-tools/schema';

const getPostgresPool = () => {
  const { Pool } = pkg;
  const pool = new Pool({
    user: 'user',
    host: 'db',
    database: 'film',
    password: 'password',
    port: 5432,
  });
  return pool;
};

const pool = getPostgresPool();
export { pool };

export function mergeModulesSchemaWith(mergeIn: any) {
  return mergeSchemas({
    ...mergeIn,
  });
}

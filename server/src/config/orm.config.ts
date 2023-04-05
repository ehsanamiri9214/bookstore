import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const {
  env: {
    DATABASE_TYPE,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_ENTITIES,
    DATABASE_MIGRATIONS,
    DATABASE_SYNCHRONIZE,
    DATABASE_DROP_SCHEMA,
    DATABASE_LOGGING,
  },
} = process;

const dataSource = new DataSource({
  type: DATABASE_TYPE as 'mysql',
  host: DATABASE_HOST,
  port: +DATABASE_PORT,
  database: DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  entities: [DATABASE_ENTITIES],
  migrations: [DATABASE_MIGRATIONS],
  synchronize: DATABASE_SYNCHRONIZE.toLowerCase() === 'true',
  dropSchema: DATABASE_DROP_SCHEMA.toLowerCase() === 'true',
  logging: DATABASE_LOGGING.toLowerCase() === 'true',
});

export default dataSource;

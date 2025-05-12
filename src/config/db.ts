import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/src/entities/*.ts'],
  migrations: [__dirname + '/src/migrations/*.ts'],
  subscribers: [__dirname + '/src/subscribers/*.ts'],
};

export default config;
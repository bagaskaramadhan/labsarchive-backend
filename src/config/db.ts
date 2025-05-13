import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import serviceENV from './service';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  host: serviceENV.DB_HOST,
  port: Number(serviceENV.DB_PORT) || 5432,
  username: serviceENV.DB_USER,
  password: serviceENV.DB_PASSWORD,
  database: serviceENV.DB_NAME,
  synchronize: false,
  logging: false
};

export default config;
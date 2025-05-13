import 'reflect-metadata';
import express from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import config from "./config/db";
import routes from "./routes";
import serviceENV from './config/service';

dotenv.config();

const app = express();
const PORT = serviceENV.PORT;

app.use(express.json());

export const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    app.use('/', routes);

    app.get('/status', async (_, res) => {
      try {
        const currentTime = await AppDataSource.query('SELECT NOW()');
        res.json({ message: 'Server and database are running', time: currentTime[0] });
      } catch (err) {
        console.error("Database error:", err);
        res.status(500).send('Database error');
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
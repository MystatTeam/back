import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from "express";

import cors from 'cors';

import './db/index.js';

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || PORT, () => {
    console.log("Server listens on port", PORT);
});

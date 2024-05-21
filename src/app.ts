import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from "express";
import cors from 'cors';

import studentRouter from './routers/studentRouter.js';
import groupRouter from './routers/groupRouter.js';
import authRouter from './routers/authRouter.js';
import studentGroupRouter from './routers/studentGroupRouter.js';
import teacherRouter from './routers/teacherRouter.js';
import disciplineRouter from './routers/disciplineRouter.js';
import teacherDisciplineRouter from './routers/teacherDisciplineRouter.js';
import groupDisciplineRouter from './routers/groupDisciplineRouter.js';
import classRouter from './routers/classRouter.js';
import classInfoRouter from './routers/classInfoRouter.js';
import homeworkRouter from './routers/homeworkRouter.js';


import feedbackRouter from './routers/feedbackRouter.js';

import errorHandler from './middleware/errorHandler.js';
import './db/index.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use(authRouter);
app.use(groupRouter);
app.use(feedbackRouter);
app.use(studentRouter);
app.use(studentGroupRouter);
app.use(teacherRouter);
app.use(disciplineRouter);
app.use(teacherDisciplineRouter);
app.use(groupDisciplineRouter);
app.use(classRouter);
app.use(classInfoRouter);
app.use(homeworkRouter);

app.use(errorHandler);
app.listen(process.env.PORT || PORT, () => {
    console.log("Server listens on port", PORT);
});

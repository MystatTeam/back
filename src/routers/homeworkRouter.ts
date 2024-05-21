import express, { Router } from 'express';

import * as HomeworkController from '../controllers/homeworkController.js';
import multer from 'multer';

const router: Router = express.Router();

const upload = multer();

router.get('/homeworks', HomeworkController.getAll);
router.get('/homeworks/:id', HomeworkController.getById);
router.post('/homeworks', upload.single('file'), HomeworkController.post);
router.patch('/homeworks/:id', HomeworkController.patch);
router.delete('/homeworks/:id', HomeworkController.remove);

export default router;
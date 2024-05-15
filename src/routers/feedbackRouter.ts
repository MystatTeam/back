import express, { Router } from 'express';

import * as FeedbackController from '../controllers/feedbackController.js';
import multer from 'multer';

const router: Router = express.Router();


router.get('/feedbacks', FeedbackController.getAll);
router.get('/feedbacks/student/:studentId', FeedbackController.getAll);
router.get('/feedbacks/:id', FeedbackController.getById);
router.post('/feedbacks', FeedbackController.post);
router.patch('/feedbacks/:id', FeedbackController.patch);
router.delete('/feedbacks/:id', FeedbackController.remove);


export default router;
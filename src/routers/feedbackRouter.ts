import express, { Router } from 'express';

import * as FeedbackController from '../controllers/feedbackController.js';
import multer from 'multer';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.get('/feedbacks', verifyJWT, checkRole('Teacher'), FeedbackController.getAll);
router.get('/feedbacks/student/:studentId', verifyJWT, checkRole('Teacher'), FeedbackController.getAllByStudentId);
router.get('/feedbacks/:id', verifyJWT, checkRole('Teacher'), FeedbackController.getById);
router.post('/feedbacks', verifyJWT, checkRole('Teacher'), FeedbackController.post);
router.patch('/feedbacks/:id', verifyJWT, checkRole('Teacher'), FeedbackController.patch);
router.delete('/feedbacks/:id', verifyJWT, checkRole('Teacher'), FeedbackController.remove);

// mystat
router.get('/mystat/feedbacks/student/:studentId', verifyJWT, checkRole('User'), FeedbackController.getAllByStudentId);
export default router;
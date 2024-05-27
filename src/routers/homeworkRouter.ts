import express, { Router } from 'express';

import * as HomeworkController from '../controllers/homeworkController.js';
import multer from 'multer';
import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

const upload = multer();

router.get('/homeworks', verifyJWT, checkRole('Teacher'), HomeworkController.getAll);
router.get('/homeworks/:id', verifyJWT, checkRole('Teacher'), HomeworkController.getById);
router.post('/homeworks', verifyJWT, checkRole('Teacher'), upload.single('file'), HomeworkController.post);
router.post('/get-homeworks-by-teacher-and-discipline', verifyJWT, checkRole('Teacher'), HomeworkController.getAllOfTeachersHomeworksFilteredByID);
router.post('/submit-homework', verifyJWT, checkRole('User'), upload.single('file'), HomeworkController.submitHomework);
router.post('/grade-homework', verifyJWT, checkRole('Teacher'), HomeworkController.gradeHomework);
router.patch('/homeworks/:id', verifyJWT, checkRole('Teacher'), upload.single('file'), HomeworkController.patch);
router.delete('/homeworks/:id', verifyJWT, checkRole('Teacher'), HomeworkController.remove);


// mystat
router.get('/mystat/homeworks/student/:id', verifyJWT, checkRole('User'), HomeworkController.getAllHomeworksByStudentId);
router.get('/mystat/homeworks/student/:studentId/discipline/:disciplineId', verifyJWT, checkRole('User'), HomeworkController.getAllHomeworksByStudentIdAndDisciplineId);

export default router;
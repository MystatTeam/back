import express, { Router } from 'express';

import * as HomeworkController from '../controllers/homeworkController.js';
import multer from 'multer';

const router: Router = express.Router();

const upload = multer();

router.get('/homeworks', HomeworkController.getAll);
router.get('/homeworks/:id', HomeworkController.getById);
router.post('/homeworks', upload.single('file'), HomeworkController.post);
router.post('/get-homeworks-by-teacher-and-discipline', HomeworkController.getAllOfTeachersHomeworksFilteredByID);
router.post('/submit-homework', upload.single('file'), HomeworkController.submitHomework);
router.post('/grade-homework', HomeworkController.gradeHomework);
router.patch('/homeworks/:id', upload.single('file'), HomeworkController.patch);
router.delete('/homeworks/:id', HomeworkController.remove);


// mystat
router.get('/mystat/homeworks/student/:id', HomeworkController.getAllHomeworksByStudentId);
router.get('/mystat/homeworks/student/:studentId/discipline/:disciplineId', HomeworkController.getAllHomeworksByStudentIdAndDisciplineId);

export default router;
import express, { Router } from 'express';

import * as TeacherController from '../controllers/teacherController';

const router: Router = express.Router();

router.get('/teacher', TeacherController.getAll);
router.get('/teacher/:id', TeacherController.getById);
router.post('/teacher', TeacherController.post);
router.patch('/teacher/:id', TeacherController.patch);
router.delete('/teacher/:id', TeacherController.remove);


export default router;
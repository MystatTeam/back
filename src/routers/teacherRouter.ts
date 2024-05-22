import express, { Router } from 'express';

import * as TeacherController from '../controllers/teacherController';

const router: Router = express.Router();

router.get('/teachers', TeacherController.getAll);
router.get('/teachers/:id', TeacherController.getById);
router.post('/teachers', TeacherController.post);
router.patch('/teachers/:id', TeacherController.patch);
router.delete('/teachers/:id', TeacherController.remove);


export default router;
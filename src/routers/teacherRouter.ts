import express, { Router } from 'express';

import * as TeacherController from '../controllers/teacherController';

import verifyJWT from '../middlewares/verifyJWT';
import checkRole from '../middlewares/checkRole';

const router: Router = express.Router();

router.get('/teachers', verifyJWT, checkRole('Teacher'), TeacherController.getAll);
router.get('/teachers/:id', verifyJWT, checkRole('Teacher'), TeacherController.getById);
router.post('/teachers', verifyJWT, checkRole('Teacher'), TeacherController.post);
router.patch('/teachers/:id', verifyJWT, checkRole('Editor'), TeacherController.patch);
router.delete('/teachers/:id', verifyJWT, checkRole('Editor'), TeacherController.remove);


export default router;
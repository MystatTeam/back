import express, { Router } from 'express';

import * as StudentController from '../controllers/studentController.js';
import multer from 'multer';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

const upload = multer();

router.get('/students', verifyJWT, checkRole('Teacher'), StudentController.getAll);
router.get('/students/:id', verifyJWT, checkRole('Teacher'), StudentController.getById);
router.post('/students', verifyJWT, checkRole('Editor'), upload.single('file'), StudentController.post);
router.patch('/students/:id', verifyJWT, checkRole('Editor'), upload.single('file'), StudentController.patch);
router.delete('/students/:id', verifyJWT, checkRole('Editor'), StudentController.remove);

// mystat
router.get('/mystat/students/:id', verifyJWT, checkRole('User'), StudentController.getById)
router.get('/mystat/students/:id/rewards', verifyJWT, checkRole('User'), StudentController.getStudentRewards);
export default router;
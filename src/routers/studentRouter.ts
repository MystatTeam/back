import express, { Router } from 'express';

import * as StudentController from '../controllers/studentController.js';
import multer from 'multer';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

const upload = multer();

router.get('/students',  StudentController.getAll);
router.get('/students/:id', StudentController.getById);
router.post('/students', upload.single('file'), StudentController.post);
router.patch('/students/:id', upload.single('file'), StudentController.patch);
router.delete('/students/:id', StudentController.remove);

// mystat
router.get('/mystat/students/:id', verifyJWT, checkRole('User'), StudentController.getById)
router.get('/mystat/students/:id/rewards', verifyJWT, checkRole('User'), StudentController.getStudentRewards);
export default router;
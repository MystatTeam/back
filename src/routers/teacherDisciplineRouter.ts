import express, { Router } from 'express';

import * as teacherDisciplineController from '../controllers/teacherDisciplineController';

import verifyJWT from '../middlewares/verifyJWT';
import checkRole from '../middlewares/checkRole';

const router: Router = express.Router();

router.get('/teacher-disciplines', verifyJWT, checkRole('Teacher'), teacherDisciplineController.getAll);
router.get('/teacher-disciplines/:id', verifyJWT, checkRole('Teacher'), teacherDisciplineController.getById);
router.get('/teacher-disciplines/discipline/:id', verifyJWT, checkRole('Teacher'), teacherDisciplineController.getByDisciplineId);
router.post('/teacher-disciplines', verifyJWT, checkRole('Editor'), teacherDisciplineController.post);
router.patch('/teacher-disciplines/:id', verifyJWT, checkRole('Editor'), teacherDisciplineController.patch);
router.delete('/teacher-disciplines/:id', verifyJWT, checkRole('Editor'), teacherDisciplineController.remove);


export default router;
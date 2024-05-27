import express, { Router } from 'express';

import * as StudentGroupController from '../controllers/studentGroupController';
import verifyJWT from '../middlewares/verifyJWT';
import checkRole from '../middlewares/checkRole';

const router: Router = express.Router();

router.get('/student-groups', verifyJWT, checkRole('Teacher'), StudentGroupController.getAll);
router.get('/student-groups/:id', verifyJWT, checkRole('Teacher'), StudentGroupController.getById);
router.post('/student-groups', verifyJWT, checkRole('Editor'), StudentGroupController.post);
router.patch('/student-groups/:id', verifyJWT, checkRole('Editor'), StudentGroupController.patch);
router.delete('/student-groups/:id', verifyJWT, checkRole('Editor'), StudentGroupController.remove);

// mystat
router.get('/mystat/student-groups/student/:id', verifyJWT, checkRole('User'), StudentGroupController.getByStudentId);
router.get('/mystat/student-groups/group/:id', verifyJWT, checkRole('User'), StudentGroupController.getByGroupId);
export default router;
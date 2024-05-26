import express, { Router } from 'express';

import * as StudentGroupController from '../controllers/studentGroupController';
import verifyJWT from '../middlewares/verifyJWT';
import checkRole from '../middlewares/checkRole';

const router: Router = express.Router();

router.get('/student-groups', StudentGroupController.getAll);
router.get('/student-groups/:id', StudentGroupController.getById);
router.post('/student-groups', StudentGroupController.post);
router.patch('/student-groups/:id', StudentGroupController.patch);
router.delete('/student-groups/:id', StudentGroupController.remove);

// mystat
router.get('/mystat/student-groups/student/:id', verifyJWT, checkRole('User'), StudentGroupController.getByStudentId);
router.get('/mystat/student-groups/group/:id', verifyJWT, checkRole('User'), StudentGroupController.getByGroupId);
export default router;
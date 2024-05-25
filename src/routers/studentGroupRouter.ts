import express, { Router } from 'express';

import * as StudentGroupController from '../controllers/studentGroupController';

const router: Router = express.Router();

router.get('/student-groups', StudentGroupController.getAll);
router.get('/student-groups/:id', StudentGroupController.getById);
router.post('/student-groups', StudentGroupController.post);
router.patch('/student-groups/:id', StudentGroupController.patch);
router.delete('/student-groups/:id', StudentGroupController.remove);

// mystat
router.get('/mystat/student-groups/student/:id', StudentGroupController.getByStudentId);
router.get('/mystat/student-groups/group/:id', StudentGroupController.getByGroupId);
export default router;
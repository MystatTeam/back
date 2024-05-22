import express, { Router } from 'express';

import * as StudentGroupController from '../controllers/studentGroupController';

const router: Router = express.Router();

router.get('/student-groups', StudentGroupController.getAll);
router.get('/student-groups/:id', StudentGroupController.getById);
router.post('/student-groups', StudentGroupController.post);
router.patch('/student-groups/:id', StudentGroupController.patch);
router.delete('/student-groups/:id', StudentGroupController.remove);


export default router;
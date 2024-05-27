import express, { Router } from 'express';

import * as ClassController from '../controllers/classController.js';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.get('/classes', verifyJWT, checkRole('Teacher'), ClassController.getAll);
router.get('/classes/:id', verifyJWT, checkRole('Teacher'), ClassController.getById);
router.post('/classes/', verifyJWT, checkRole('Editor'), ClassController.post);
router.patch('/classes/:id', verifyJWT, checkRole('Editor'), ClassController.patch);
router.delete('/classes/:id', verifyJWT, checkRole('Editor'), ClassController.remove);

// mystat
router.get('/classes/group/:id', verifyJWT, checkRole('User'), ClassController.getByGroupId);

export default router;
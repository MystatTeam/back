import express, { Router } from 'express';

import * as GroupController from '../controllers/groupController';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.get('/groups', verifyJWT, checkRole('Teacher'), GroupController.getAll);
router.get('/groups/:id', verifyJWT, checkRole('Teacher'), GroupController.getById);
router.post('/groups', verifyJWT, checkRole('Editor'), GroupController.post);
router.patch('/groups/:id', verifyJWT, checkRole('Editor'), GroupController.patch);
router.delete('/groups/:id', verifyJWT, checkRole('Editor'), GroupController.remove);


export default router;
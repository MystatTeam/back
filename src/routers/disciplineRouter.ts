import express, { Router } from 'express';

import * as disciplineController from '../controllers/disciplineController';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.get('/disciplines', verifyJWT, checkRole('Teacher'), disciplineController.getAll);
router.get('/disciplines/:id', verifyJWT, checkRole('Teacher'), disciplineController.getById);
router.post('/disciplines', verifyJWT, checkRole('Editor'), disciplineController.post);
router.patch('/disciplines/:id', verifyJWT, checkRole('Editor'), disciplineController.patch);
router.delete('/disciplines/:id', verifyJWT, checkRole('Editor'), disciplineController.remove);


export default router;
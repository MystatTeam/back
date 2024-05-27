import express, { Router } from 'express';

import * as groupDisciplineController from '../controllers/groupDisciplineController';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.get('/group-disciplines', verifyJWT, checkRole('Teacher'), groupDisciplineController.getAll);
router.get('/group-disciplines/:id', verifyJWT, checkRole('Teacher'), groupDisciplineController.getById);
router.get('/group-disciplines/discipline/:id', verifyJWT, checkRole('Teacher'), groupDisciplineController.getByDisciplineId)
router.post('/group-disciplines', verifyJWT, checkRole('Editor'), groupDisciplineController.post);
router.patch('/group-disciplines/:id', verifyJWT, checkRole('Editor'), groupDisciplineController.patch);
router.delete('/group-disciplines/:id', verifyJWT, checkRole('Editor'), groupDisciplineController.remove);


export default router;
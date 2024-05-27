import express, { Router } from 'express';

import * as ClassInfoController from '../controllers/classInfoController.js';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.get('/class-infos', verifyJWT, checkRole('Teacher'), ClassInfoController.getAll);
router.get('/class-infos/:id', verifyJWT, checkRole('Teacher'), ClassInfoController.getById);
router.post('/class-infos', verifyJWT, checkRole('Teacher'), ClassInfoController.post);
router.patch('/class-infos/:id', verifyJWT, checkRole('Teacher'), ClassInfoController.patch);
router.patch('/class-infos/bulk-update/:id', verifyJWT, checkRole('Teacher'), ClassInfoController.patchMany)
router.delete('/class-infos/:id', verifyJWT, checkRole('Editor'), ClassInfoController.remove);

// mystat
router.get('/mystat/class-infos/student/:id', verifyJWT, checkRole('User'), ClassInfoController.getByStudentId);

export default router;
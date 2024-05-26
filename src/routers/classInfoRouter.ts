import express, { Router } from 'express';

import * as ClassInfoController from '../controllers/classInfoController.js';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.get('/class-infos', ClassInfoController.getAll);
router.get('/class-infos/:id', ClassInfoController.getById);
router.post('/class-infos', ClassInfoController.post);
router.patch('/class-infos/:id', ClassInfoController.patch);
router.patch('/class-infos/bulk-update/:id', ClassInfoController.patchMany)
router.delete('/class-infos/:id', ClassInfoController.remove);

// mystat
router.get('/mystat/class-infos/student/:id', verifyJWT, checkRole('User'), ClassInfoController.getByStudentId);

export default router;
import express, { Router } from 'express';

import * as ClassInfoController from '../controllers/classInfoController.js';

const router: Router = express.Router();

router.get('/class-info', ClassInfoController.getAll);
router.get('/class-info/:id', ClassInfoController.getById);
router.post('/class-info', ClassInfoController.post);
router.patch('/class-info/:id', ClassInfoController.patch);
router.delete('/class-info/:id', ClassInfoController.remove);

export default router;
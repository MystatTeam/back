import express, { Router } from 'express';

import * as ClassInfoController from '../controllers/classInfoController.js';

const router: Router = express.Router();

router.get('/class-infos', ClassInfoController.getAll);
router.get('/class-infos/:id', ClassInfoController.getById);
router.post('/class-infos', ClassInfoController.post);
router.patch('/class-infos/:id', ClassInfoController.patch);
router.delete('/class-infos/:id', ClassInfoController.remove);

export default router;
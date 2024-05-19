import express, { Router } from 'express';

import * as ClassController from '../controllers/classController.js';

const router: Router = express.Router();

router.get('/classes', ClassController.getAll);
router.get('/classes/:id', ClassController.getById);
router.post('/classes/', ClassController.post);
router.patch('/classes/:id', ClassController.patch);
router.delete('/classes/:id', ClassController.remove);

export default router;
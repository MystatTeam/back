import express, { Router } from 'express';

import * as disciplineController from '../controllers/disciplineController';

const router: Router = express.Router();

router.get('/discipline', disciplineController.getAll);
router.get('/discipline/:id', disciplineController.getById);
router.post('/discipline', disciplineController.post);
router.patch('/discipline/:id', disciplineController.patch);
router.delete('/discipline/:id', disciplineController.remove);


export default router;
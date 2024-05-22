import express, { Router } from 'express';

import * as disciplineController from '../controllers/disciplineController';

const router: Router = express.Router();

router.get('/disciplines', disciplineController.getAll);
router.get('/disciplines/:id', disciplineController.getById);
router.post('/disciplines', disciplineController.post);
router.patch('/disciplines/:id', disciplineController.patch);
router.delete('/disciplines/:id', disciplineController.remove);


export default router;
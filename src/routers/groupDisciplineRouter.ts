import express, { Router } from 'express';

import * as groupDisciplineController from '../controllers/groupDisciplineController';

const router: Router = express.Router();

router.get('/groupDiscipline', groupDisciplineController.getAll);
router.get('/groupDiscipline/:id', groupDisciplineController.getById);
router.post('/groupDiscipline', groupDisciplineController.post);
router.patch('/groupDiscipline/:id', groupDisciplineController.patch);
router.delete('/groupDiscipline/:id', groupDisciplineController.remove);


export default router;
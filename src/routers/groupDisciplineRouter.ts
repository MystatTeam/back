import express, { Router } from 'express';

import * as groupDisciplineController from '../controllers/groupDisciplineController';

const router: Router = express.Router();

router.get('/group-disciplines', groupDisciplineController.getAll);
router.get('/group-disciplines/:id', groupDisciplineController.getById);
router.post('/group-disciplines', groupDisciplineController.post);
router.patch('/group-disciplines/:id', groupDisciplineController.patch);
router.delete('/group-disciplines/:id', groupDisciplineController.remove);


export default router;
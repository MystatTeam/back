import express, { Router } from 'express';

import * as GroupController from '../controllers/groupController';

const router: Router = express.Router();

router.get('/group', GroupController.getAll);
router.get('/group/:id', GroupController.getById);
router.post('/group', GroupController.post);
router.patch('/group/:id', GroupController.patch);
router.delete('/group/:id', GroupController.remove);


export default router;
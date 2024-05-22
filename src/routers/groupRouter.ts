import express, { Router } from 'express';

import * as GroupController from '../controllers/groupController';

const router: Router = express.Router();

router.get('/groups', GroupController.getAll);
router.get('/groups/:id', GroupController.getById);
router.post('/groups', GroupController.post);
router.patch('/groups/:id', GroupController.patch);
router.delete('/groups/:id', GroupController.remove);


export default router;
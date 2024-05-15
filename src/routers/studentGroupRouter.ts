import express, { Router } from 'express';

import * as StudentGroupController from '../controllers/studentGroupController';

const router: Router = express.Router();

router.get('/studentgroup', StudentGroupController.getAll);
router.get('/studentgroup/:id', StudentGroupController.getById);
router.post('/studentgroup', StudentGroupController.post);
router.patch('/studentgroup/:id', StudentGroupController.patch);
router.delete('/studentgroup/:id', StudentGroupController.remove);


export default router;
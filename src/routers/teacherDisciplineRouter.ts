import express, { Router } from 'express';

import * as teacherDisciplineController from '../controllers/teacherDisciplineController';

const router: Router = express.Router();

router.get('/teacherDiscipline', teacherDisciplineController.getAll);
router.get('/teacherDiscipline/:id', teacherDisciplineController.getById);
router.post('/teacherDiscipline', teacherDisciplineController.post);
router.patch('/teacherDiscipline/:id', teacherDisciplineController.patch);
router.delete('/teacherDiscipline/:id', teacherDisciplineController.remove);


export default router;
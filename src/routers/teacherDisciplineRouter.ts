import express, { Router } from 'express';

import * as teacherDisciplineController from '../controllers/teacherDisciplineController';

const router: Router = express.Router();

router.get('/teacher-disciplines', teacherDisciplineController.getAll);
router.get('/teacher-disciplines/:id', teacherDisciplineController.getById);
router.post('/teacher-disciplines', teacherDisciplineController.post);
router.patch('/teacher-disciplines/:id', teacherDisciplineController.patch);
router.delete('/teacher-disciplines/:id', teacherDisciplineController.remove);


export default router;
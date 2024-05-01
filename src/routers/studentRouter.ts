import express, { Router } from 'express';

import * as StudentController from '../controllers/studentController.js';

const router: Router = express.Router();

router.get('/students', StudentController.getAll);
router.post('/students', StudentController.post);
router.patch('students/:id', StudentController.patch);
router.delete('students/:id', StudentController.remove);


export default router;
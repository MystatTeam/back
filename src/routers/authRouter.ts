import express, { Router } from 'express';

import * as authController from '../controllers/authController.js';
import * as refreshTokenController from '../controllers/refreshTokenController.js';
import * as logoutContoller from '../controllers/logoutContoller.js';

import verifyJWT from '../middlewares/verifyJWT.js';
import checkRole from '../middlewares/checkRole.js';

const router: Router = express.Router();

router.post('/student-login', authController.handleStudentLogin);
router.post('/teacher-login', authController.handleTeacherLogin);
router.get('/refresh', refreshTokenController.handleRefreshToken);
router.get('/logout', logoutContoller.handleLogout);

router.patch('/grant-role/to/:id', verifyJWT, checkRole('Admin'), authController.grantRole)
router.patch('/revoke-role/from/:id', verifyJWT, checkRole('Admin'), authController.revokeRole)

export default router;
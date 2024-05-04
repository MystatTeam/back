import express, { Router } from 'express';

import * as registerController from '../controllers/registerController.js';
import * as authController from '../controllers/authController.js';
import * as refreshTokenController from '../controllers/refreshTokenController.js';
import * as logoutContoller from '../controllers/logoutContoller.js';

const router: Router = express.Router();

router.post('/register', registerController.handleNewUser);
router.post('/login', authController.handleLogin);
router.get('/refresh', refreshTokenController.handleRefreshToken);
router.get('/logout', logoutContoller.handleLogout);

export default router;
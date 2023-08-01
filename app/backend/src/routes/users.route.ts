import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import LoginValidation from '../middlewares/LoginValidation';

const router = Router();

const usersController = new UsersController();

router.post('/login', (req, res, next) =>
  LoginValidation.validateLogin(req, res, next), usersController.login);

export default router;

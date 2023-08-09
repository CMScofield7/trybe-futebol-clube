import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import LoginValidation from '../middlewares/LoginValidation';
import TokenValidation from '../middlewares/TokenValidation';

const router = Router();

const usersController = new UsersController();

router.post('/login', (req, res, next) =>
  LoginValidation.validateLogin(req, res, next), usersController.login);
router.get('/login/role', (req, res, next) =>
  TokenValidation.validate(req, res, next), usersController.getUserByRole);
export default router;

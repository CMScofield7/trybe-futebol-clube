import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import TokenValidation from '../middlewares/TokenValidation';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAllMatches);
router.patch('/matches/:id/finish', (req, res, next) =>
  TokenValidation.validate(req, res, next), matchesController.updateMatchToFinished);
router.patch('/matches/:id', (req, res, next) =>
  TokenValidation.validate(req, res, next), matchesController.updateMatchScore);
router.post('/matches', (req, res, next) =>
  TokenValidation.validate(req, res, next), matchesController.createMatch);

export default router;

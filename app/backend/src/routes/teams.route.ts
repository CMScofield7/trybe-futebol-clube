import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsServices';
import Teams from '../database/models/TeamsModel';

const router = Router();

const teamsService = new TeamsService(Teams);
const teamsController = new TeamsController(teamsService);

router.get('/teams', teamsController.getAllTeams);
router.get('/teams/:id', teamsController.getTeamById);

export default router;

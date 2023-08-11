import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/leaderboard/home', leaderboardController.homeTeamsTable);

export default router;

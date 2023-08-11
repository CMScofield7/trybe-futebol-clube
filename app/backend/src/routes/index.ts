import { Router } from 'express';
import teamsRoute from './teams.route';
import usersRoute from './users.route';
import matchesRoute from './matches.route';
import leaderboardRoute from './leaderboard.route';

const router = Router();

router.use(teamsRoute);
router.use(usersRoute);
router.use(matchesRoute);
router.use(leaderboardRoute);

export default router;

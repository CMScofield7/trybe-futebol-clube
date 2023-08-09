import { Router } from 'express';
import teamsRoute from './teams.route';
import usersRoute from './users.route';
import matchesRoute from './matches.route';

const router = Router();

router.use(teamsRoute);
router.use(usersRoute);
router.use(matchesRoute);

export default router;

import { Router } from 'express';
import teamsRoute from './teams.route';
import usersRoute from './users.route';

const router = Router();

router.use(teamsRoute);
router.use(usersRoute);

export default router;

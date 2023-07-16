import { Router } from 'express';
import teamsRoute from './teams.route';

const router = Router();

router.use(teamsRoute);

export default router;

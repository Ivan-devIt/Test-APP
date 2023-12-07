import { Router } from 'express';
import { usersRoute } from './users.route';
import { E_Routes, E_RoutesVersion } from './types';

const mainRouter = Router();

mainRouter.use(`/${E_Routes.users}`, usersRoute);

export { mainRouter };

import { Router } from 'express';
import { usersRoute } from './users.route';
import { E_Routes } from './types';

const mainRouter = Router();

mainRouter.use(`/${E_Routes.users}`, usersRoute);

export { mainRouter };

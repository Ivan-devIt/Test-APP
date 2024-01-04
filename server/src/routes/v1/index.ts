import { Response, Request, Router } from 'express';
import { usersRoute } from './users.route';
import { authRoute } from './auth.route';
import { E_Routes } from '../../types';

const mainRouter = Router();

mainRouter.get(`/${E_Routes.healthcheck}`, (req: Request, res: Response) =>
  res.sendStatus(200),
);

//auth
mainRouter.use(`/${E_Routes.auth}`, authRoute);

//user routes
mainRouter.use(`/${E_Routes.users}`, usersRoute);

export { mainRouter };

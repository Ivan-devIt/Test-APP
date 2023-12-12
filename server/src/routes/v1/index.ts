import { Response, Request, Router } from 'express';
import { usersRoute } from './users.route';
import { E_Routes } from '../../types';

const mainRouter = Router();

mainRouter.get(`/${E_Routes.healthcheck}`, (req: Request, res: Response) =>
  res.sendStatus(200),
);

//user routes
mainRouter.use(`/${E_Routes.users}`, usersRoute);

export { mainRouter };

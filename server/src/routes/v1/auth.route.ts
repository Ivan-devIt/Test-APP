import { Router } from 'express';
import { E_Routes } from '../../types';
import { authController } from '../../modules/auth/auth.controller';

const authRoute = Router();

//registration(create) a new user
authRoute.post(`/${E_Routes.registration}`, authController.registration);

//registration(create) a new user
authRoute.post(`/${E_Routes.login}`, authController.login);

//logout
authRoute.post(`/${E_Routes.logout}`, authController.logout);

export { authRoute };

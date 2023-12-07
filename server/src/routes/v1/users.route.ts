import { Router } from 'express';
import { userController } from '../../modules/user/user.controllers';
import { E_Routes } from './types';

const usersRoute = Router();

usersRoute.get(`/`, userController.getUsers);
usersRoute.get('/:userId', userController.getUserById);

usersRoute.post(`/${E_Routes.create}`, userController.createUser);

export { usersRoute };

import { Router } from 'express';
import { userController } from '../../modules/user/user.controller';
import { E_Params, E_Routes } from '../../types';

const usersRoute = Router();

//get all users
usersRoute.get(`/`, userController.getUsers);

//get one user by userId
usersRoute.get(`/:${E_Params.userId}`, userController.getUserById);

//create(registration) a new user
usersRoute.post(`/${E_Routes.create}`, userController.createUser);

export { usersRoute };

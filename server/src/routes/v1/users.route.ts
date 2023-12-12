import { Router } from 'express';
import { userController } from '../../modules/user/user.controller';
import { E_Routes } from '../../types';

const usersRoute = Router();

//get all users
usersRoute.get(`/`, userController.getUsers);
//get one user by userId
usersRoute.get('/:userId', userController.getUserById);
//create a new user
usersRoute.post(`/${E_Routes.create}`, userController.createUser);

export { usersRoute };

//TODO remove this
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

// *** GET ALL USERS
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all users
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

// *** GET USER BY USERID
/**
 * @swagger
 * /api/v1/users/{userId}:
 *  get:
 *     tags:
 *     - Users
 *     description: Responds if the app is up and running
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: User id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       "200":
 *         description: App is up and running
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserByIdResponseSuccess'
 */

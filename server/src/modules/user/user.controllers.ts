import { Response, Request } from 'express';
import { I_User } from './user.types';
import User from './user.model';
import { userService } from './user.service';

class UserController {
  async getUsers(req: Request, res: Response) {
    console.log('getUsers==');

    const users = await userService.getUsers();

    console.log('users==', users);

    res.send(users);
  }

  async createUser(req: Request, res: Response) {
    console.log('createUser==');
    const createdUser = await userService.createUser();

    res.send(createdUser);
  }
}

export const userController = new UserController();

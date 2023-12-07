import { Response, Request } from 'express';
import { I_User } from './user.types';
import User from './user.model';
import { userService } from './user.service';

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();

    res.send(users);
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params['userId'];

    if (typeof userId === 'string') {
      const user = await userService.getUserById(userId);

      res.send(user);
    }
  }

  async createUser(req: Request, res: Response) {
    console.log('createUser==');
    const createdUser = await userService.createUser(req.body);

    res.send(createdUser);
  }
}

export const userController = new UserController();

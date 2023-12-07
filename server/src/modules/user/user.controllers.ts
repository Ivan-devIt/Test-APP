import { Response, Request } from 'express';
import { userService } from './user.service';
import { catchAsync, generateResponse } from '../../utils';
import httpStatus from 'http-status';
import { E_ResponseMessage } from '../../types';

class UserController {
  getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    res.send(users);
  });

  getUserById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params['userId'];

    if (typeof userId === 'string') {
      const user = await userService.getUserById(userId);

      res.send(generateResponse({ statusCode: httpStatus.OK, data: user, message: E_ResponseMessage.SUCCESS }));
    }
  });

  async createUser(req: Request, res: Response) {
    console.log('createUser==');
    const createdUser = await userService.createUser(req.body);

    res.send(createdUser);
  }
}

export const userController = new UserController();

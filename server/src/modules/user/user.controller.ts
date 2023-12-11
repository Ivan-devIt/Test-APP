import { Response, Request } from 'express';
import { userService } from './user.service';
import { catchAsync, generateResponse } from '../../utils/';
import httpStatus from 'http-status';
import { E_ResponseMessage } from '../../types';

export class UserController {
  public getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    const response = generateResponse({
      statusCode: httpStatus.OK,
      data: users,
      message: E_ResponseMessage.SUCCESS,
    });

    res.send(response);
  });

  public getUserById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params['userId'];

    if (typeof userId === 'string') {
      const user = await userService.getUserById(userId);
      const response = generateResponse({
        statusCode: httpStatus.OK,
        data: user,
        message: E_ResponseMessage.SUCCESS,
      });

      res.send(response);
    }
  });

  public createUser = catchAsync(async (req: Request, res: Response) => {
    const createdUser = await userService.createUser(req.body);

    res.send(createdUser);
  });
}

export const userController = new UserController();

import { Response, Request } from 'express';
import {
  ApiError,
  catchAsync,
  generateResponse,
  setRefreshToketToCookies,
} from '../../utils';
import { authService } from './auth.service';
import httpStatus from 'http-status';
import { E_Cookies, E_ResponseMessage } from '../../types';

export class AuthController {
  //registration
  public registration = catchAsync(async (req: Request, res: Response) => {
    const registeredUser = await authService.registration(req.body);

    const response = generateResponse({
      statusCode: httpStatus.OK,
      data: registeredUser,
      message: E_ResponseMessage.SUCCESS,
    });

    res.send(response);
  });

  //login
  public login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const loginData = await authService.login(email, password);

    if (!!loginData.refreshToken) {
      setRefreshToketToCookies(res, loginData.refreshToken);
    }

    const response = generateResponse({
      statusCode: httpStatus.OK,
      data: loginData,
      message: E_ResponseMessage.SUCCESS,
    });

    res.send(response);
  });

  //logout
  public logout = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Cookies is not found!`);
    }

    const tokenData = await authService.logout(refreshToken);

    res.clearCookie(E_Cookies.refreshToken);

    const response = generateResponse({
      statusCode: httpStatus.OK,
      data: tokenData,
      message: E_ResponseMessage.SUCCESS,
    });

    res.send(response);
  });
}

export const authController = new AuthController();

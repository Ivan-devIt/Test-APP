import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { I_CreateUserResponse, I_User } from '../user/user.interfaces';
import { userService } from '../user/user.service';
import User from '../user/user.model';
import { UserDto } from '../user/user.dto';
import { ApiError } from '../../utils/errors';
import { tokenService } from '../jwtTokens';

class AuthService {
  async registration(body: I_User): Promise<I_CreateUserResponse> {
    return userService.createUser(body);
  }

  async login(email: string, password: string): Promise<I_CreateUserResponse> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `User with email:${email} is not found`,
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Incorrect password`);
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const prepareResponse = { user: userDto, ...tokens };

    return prepareResponse;
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

export const authService = new AuthService();

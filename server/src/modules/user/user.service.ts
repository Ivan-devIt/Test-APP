import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { ApiError } from '../../utils/errors';
import User from './user.model';
import { I_CreateUserResponse, I_User } from './user.interfaces';
import { tokenService } from '../jwtTokens';
import { UserDto } from './user.dto';

class UserService {
  //get users
  async getUsers(): Promise<I_User[]> {
    const users: I_User[] = await User.find().select('-__v');
    return users;
  }

  //get user by user id
  async getUserById(userId: string): Promise<I_User> {
    const user = await User.findOne({ _id: userId }).select('-__v');

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `User with id:${userId} is not found`,
      );
    }

    return user;
  }

  //create user
  async createUser(body: I_User): Promise<I_CreateUserResponse> {
    const isEmalExist = await User.isEmailTaken(body.email);

    if (isEmalExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Email: '${body.email}' already taken`,
      );
    }

    //hash user password
    const hashPassword = await bcrypt.hash(body.password, 5);

    //create new user with hashed password
    const createdUser = await User.create({ ...body, password: hashPassword });

    // prepare user dto
    const userDto = new UserDto(createdUser);

    // generate tokens
    const tokens = tokenService.generateTokens({ ...userDto });

    //save token in database
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const prepareResponse = { user: userDto, ...tokens };

    return prepareResponse;
  }
}

export const userService = new UserService();

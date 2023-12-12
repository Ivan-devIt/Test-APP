import httpStatus from 'http-status';
import { ApiError } from '../../utils/errors';
import User from './user.model';
import { I_User } from './user.interfaces';

class UserService {
  async getUsers(): Promise<I_User[]> {
    const users: I_User[] = await User.find().select('-__v');
    return users;
  }

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

  async createUser(body: I_User): Promise<I_User> {
    const isEmalExist = await User.isEmailTaken(body.email);

    if (isEmalExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Email: '${body.email}' already taken`,
      );
    }

    const createdUser = await User.create(body);

    return createdUser;
  }
}

export const userService = new UserService();

// export default new UserService();

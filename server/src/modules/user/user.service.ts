import httpStatus from 'http-status';
import { ApiError } from '../errors';
import User from './user.model';
import { I_User } from './user.types';

class UserService {
  async getUsers(): Promise<I_User[]> {
    const users: I_User[] = await User.find();
    return users;
  }

  async getUserById(userId: string): Promise<I_User> {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, `User with id:${userId} is not found`);
    }

    return user;
  }

  async createUser(body: any): Promise<any> {
    try {
      //TODO
      const createdUser = await User.create({ name: 'Ivan', email: 'lorf1991@gmail.com', password: '1234234' });

      return createdUser;
    } catch (err: any) {
      console.log(err?.message);
    }
  }
}

export const userService = new UserService();

// export default new UserService();

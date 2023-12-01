import User from './user.model';
import { I_User } from './user.types';

class UserService {
  async getUsers(): Promise<any> {
    try {
      const users: I_User[] = await User.find();

      return users;
    } catch (err) {}
  }

  async createUser(): Promise<any> {
    try {
      const createdUser = await User.create({ name: 'Ivan', email: 'lorf1991@gmail.com', password: '1234234' });

      return createdUser;
    } catch (err) {}
  }
}

export const userService = new UserService();

// export default new UserService();

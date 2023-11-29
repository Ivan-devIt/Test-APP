import User from './user.model';
import { I_User } from './user.types';

class UserService {
  async getUsers(): Promise<any> {
    try {
      const users: I_User[] = await User.find();
    } catch (err) {}
  }

  async createUser(): Promise<any> {
    try {
    } catch (err) {}
  }
}

export default new UserService();

import User from './user.model';
import { I_User } from './user.types';

class UserService {
  async getUsers(): Promise<any> {
    try {
      const users: I_User[] = await User.find();

      return users;
    } catch (err) {}
  }

  async getUserById(userId: string): Promise<any> {
    try {
      console.log('===userId===', userId);

      const user = await User.findOne({ _id: userId });

      console.log('===user===', user);

      return user || [];
    } catch (err: any) {
      console.log(err?.message);
    }
  }

  async createUser(body: any): Promise<any> {
    try {
      const createdUser = await User.create({ name: 'Ivan', email: 'lorf1991@gmail.com', password: '1234234' });

      return createdUser;
    } catch (err: any) {
      console.log(err?.message);
    }
  }
}

export const userService = new UserService();

// export default new UserService();

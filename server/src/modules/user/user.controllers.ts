import { Response, Request } from 'express';
import { I_User } from './user.types';
import User from './user.model';
import UserService from './user.service';

class UserController {
  async getUsers() {
    const users = await UserService.getUsers;
  }
}

// const getUser = async (req: Request, res: Response): Promise<void> => {
//   try {

//     res.status(200).json({ users });
//   } catch (error) {
//     throw error;
//   }
// };

// export { getUser };

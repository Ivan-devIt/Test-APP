import { Document, Types, Model } from 'mongoose';
import { UserDto } from './user.dto';

export interface I_User {
  name: string;
  email: string;
  password: string;
}

export interface I_UserDoc extends I_User, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface I_UserModel extends Model<I_UserDoc> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>;
  // paginate(
  //   filter: Record<string, any>,
  //   options: Record<string, any>,
  // ): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<I_User>;

export interface I_CreateUserResponse {
  user: UserDto;
  refreshToken: string;
  accessToken: string;
}

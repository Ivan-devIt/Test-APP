import { Document, Types, Model } from 'mongoose';

export interface I_User {
  name: string;
  email: string;
  password: string;
}

export interface I_UserDoc extends I_User, Document {}

export interface IUserModel extends Model<I_UserDoc> {
  isEmailTaken(email: string, excludeUserId?: Types.ObjectId): Promise<boolean>;
  // paginate(
  //   filter: Record<string, any>,
  //   options: Record<string, any>,
  // ): Promise<QueryResult>;
}

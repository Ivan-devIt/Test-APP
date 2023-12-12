import { IUserModel, I_UserDoc } from './user.interfaces';
import { model, Schema, ObjectId } from 'mongoose';

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.static(
  'isEmailTaken',
  async function (email: string, excludeUserId: ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  },
);

export default model<I_UserDoc, IUserModel>('User', userSchema);

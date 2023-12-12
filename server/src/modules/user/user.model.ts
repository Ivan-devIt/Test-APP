import { model, Schema, ObjectId } from 'mongoose';
import validator from 'validator';
import { I_UserModel, I_UserDoc } from './user.interfaces';

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
      trim: true,
      lowercase: true,
      validate(value: string): void {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate(value: string): void {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number',
          );
        }
      },
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

export default model<I_UserDoc, I_UserModel>('User', userSchema);

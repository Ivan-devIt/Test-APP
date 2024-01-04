import { I_UserDoc } from './user.interfaces';

export class UserDto {
  id;
  name;
  email;

  constructor(model: I_UserDoc) {
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
  }
}

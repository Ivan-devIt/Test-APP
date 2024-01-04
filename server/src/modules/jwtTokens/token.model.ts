import { Schema, model } from 'mongoose';
import { E_ShemasNames } from '../../types';

const TokenSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: E_ShemasNames.User },
  refreshToken: { type: String, required: true },
});

export default model(E_ShemasNames.Token, TokenSchema);

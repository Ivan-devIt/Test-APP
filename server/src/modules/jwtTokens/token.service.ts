import { config } from '../../config';
import Token from '../jwtTokens/token.model';
import * as jwt from 'jsonwebtoken';
import { UserDto } from '../user/user.dto';
import httpStatus from 'http-status';
import { ApiError } from '../../utils/errors';

class TokenService {
  private readonly JWT_CONFIG = {
    JWT_ACCESS_SECRET: config.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: config.JWT_REFRESH_SECRET,
    JWT_ACCESS_LIVE: config.JWT_ACCESS_LIVE,
    JWT_REFRESH_LIVE: config.JWT_REFRESH_LIVE,
  };

  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, this.JWT_CONFIG.JWT_ACCESS_SECRET, {
      expiresIn: this.JWT_CONFIG.JWT_ACCESS_LIVE,
    });

    const refreshToken = jwt.sign(payload, this.JWT_CONFIG.JWT_ACCESS_SECRET, {
      expiresIn: this.JWT_CONFIG.JWT_REFRESH_LIVE,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const createdToken = await Token.create({ user: userId, refreshToken });
    return createdToken;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });

    if (!tokenData) {
      throw new ApiError(httpStatus.NOT_FOUND, `Not found refreshToken!`);
    }

    const removedToken = await Token.deleteOne({ refreshToken });

    return removedToken;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });

    if (!tokenData) {
      throw new ApiError(httpStatus.NOT_FOUND, `Not found`);
    }

    return tokenData;
  }
}

export const tokenService = new TokenService();

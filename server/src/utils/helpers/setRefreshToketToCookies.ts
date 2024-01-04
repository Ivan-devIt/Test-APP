import { Response } from 'express';
import { config } from '../../config';
import { E_Cookies } from '../../types';

const { JWT_REFRESH_LIVE } = config;

export const setRefreshToketToCookies = (
  res: Response,
  refreshToken: string,
) => {
  const days = Number(
    JWT_REFRESH_LIVE.split('')
      .filter((el) => !isNaN(Number(el)))
      .join(''),
  );

  res.cookie(E_Cookies.refreshToken, refreshToken, {
    maxAge: days * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

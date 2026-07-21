import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { User } from '../types/index.js';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  factoryId: string;
}

export const generateTokens = (user: Partial<User>) => {
  const payload: TokenPayload = {
    userId: user._id as string,
    email: user.email as string,
    role: user.role as string,
    factoryId: user.factoryId as string,
  };

  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });

  return { token, refreshToken };
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
};

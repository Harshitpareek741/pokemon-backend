import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const dev = process.env.NODE_ENV === 'development';

export const generateJWT = (userId: string | number, secret: string, expirationTime: number): string => {
  return jwt.sign({ userId }, secret, {expiresIn: expirationTime });
};

export const clearTokens = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    signed: true,
  });
};

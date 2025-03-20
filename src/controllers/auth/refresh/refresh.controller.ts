import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { clearTokens, generateJWT } from '../../../utils/auth/auth.js';
import { Request, Response, NextFunction } from 'express';
import User from '../../../models/User.js';
import dotenv from 'dotenv';
import Artist from '../../../models/Artist.js';
dotenv.config();

interface DecodedToken {
  userId: number | string;
}
const ACCESS_TOKEN_LIFE_SECONDS = Number(process.env.ACCESS_TOKEN_LIFE_SECOND);
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cookies = req.headers.cookie?.split('; ');
  if (!cookies?.length) {
    return ;
  }
  
  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`refreshToken=`)
  );
  if (!refreshTokenCookie) {
    return ;
  }
  
  const refreshToken =  refreshTokenCookie.split('=')[1] ;

  if (!refreshToken) {
    res.sendStatus(204);
    return ;
  }

  try {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as DecodedToken;
      const { userId } = decoded;

      let user = await User.findById(userId);
      if(!user){
        user = await Artist.findById(userId);
      }
      if (!user) {
        console.log("yeah");
        await clearTokens(req, res);
        throw createError.Unauthorized();
      }
  
      const accessToken = generateJWT(user.id, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE_SECONDS);
      res.status(200).json({
        user,
        accessToken,
        expiresAt: new Date(Date.now() + ACCESS_TOKEN_LIFE_SECONDS * 1000)
      });
      return;
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

import { clearTokens } from '../../../utils/auth/auth.js';
import { Request, Response, NextFunction } from 'express';


export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await clearTokens(req, res);
   res.sendStatus(204);
   return ; 
};

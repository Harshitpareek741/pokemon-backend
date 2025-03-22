var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { clearTokens, generateJWT } from '../../../utils/auth/auth.js';
import User from '../../../models/User.js';
import dotenv from 'dotenv';
import Admin from '../../../models/Admin.js';
dotenv.config();
const ACCESS_TOKEN_LIFE_SECONDS = Number(process.env.ACCESS_TOKEN_LIFE_SECOND);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const refreshAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cookies = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('; ');
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.length)) {
        return;
    }
    const refreshTokenCookie = cookies.find((cookie) => cookie.startsWith(`refreshToken=`));
    if (!refreshTokenCookie) {
        return;
    }
    const refreshToken = refreshTokenCookie.split('=')[1];
    if (!refreshToken) {
        res.sendStatus(204);
        return;
    }
    try {
        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const { userId } = decoded;
            let user = yield User.findById(userId);
            if (!user) {
                user = yield Admin.findById(userId);
            }
            if (!user) {
                console.log("yeah");
                yield clearTokens(req, res);
                throw createError.Unauthorized();
            }
            const accessToken = generateJWT(user.id, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE_SECONDS);
            res.status(200).json({
                user,
                accessToken,
                expiresAt: new Date(Date.now() + ACCESS_TOKEN_LIFE_SECONDS * 1000)
            });
            return;
        }
        catch (error) {
            return next(error);
        }
    }
    catch (error) {
        return next(error);
    }
});

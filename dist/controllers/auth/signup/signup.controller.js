var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../../../models/User.js';
import Admin from '../../../models/Admin.js';
import { validateFields, artistRequiredFields, userRequiredFields } from '../../../utils/validators/validator.js';
export const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        if (role && role === 'admin') {
            const missingArtist = validateFields(req.body, artistRequiredFields);
            if (missingArtist) {
                res.status(422).json({ error: `Please fill the required admin field: ${missingArtist}` });
                return;
            }
            const { username, email, password, } = req.body;
            const adminAlreadyExists = yield Admin.findOne({ $or: [{ username }, { email }] });
            if (adminAlreadyExists) {
                res.status(422).json({ error: 'Username or email already exists' });
                return;
            }
            const newAdmin = yield Admin.create({
                username,
                email,
                password,
                role: 'Admin',
            });
            req.userId = newAdmin._id;
        }
        else {
            const missingUser = validateFields(req.body, userRequiredFields);
            if (missingUser) {
                res.status(422).json({ error: `Please fill the required field: ${missingUser}` });
                return;
            }
            const { username, email, password } = req.body;
            const userAlreadyExists = yield User.findOne({ $or: [{ username }, { email }] });
            if (userAlreadyExists) {
                res.status(422).json({ error: 'Username or email already exists' });
                return;
            }
            const newUser = yield User.create({
                username,
                email,
                password,
                role: 'User'
            });
            req.userId = newUser._id;
        }
        next();
    }
    catch (error) {
        next(error);
    }
});

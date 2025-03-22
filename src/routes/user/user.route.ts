import { Router } from 'express';
import { GenericController } from '../../controllers/genericController.js';
import User from '../../models/User.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';

const userController = new GenericController(User);
const router: Router = Router();

router.get('/list', userController.getAll);
router.get('/:id', isAuthenticated('user'), userController.get);


export default router;

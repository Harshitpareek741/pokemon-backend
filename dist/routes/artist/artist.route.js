import { Router } from 'express';
import { GenericController } from '../../controllers/genericController.js';
import Artist from '../../models/Admin.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
const artistController = new GenericController(Artist);
const router = Router();
router.get('/list', artistController.getAll);
router.get('/:id', isAuthenticated('user&artist'), artistController.get);
export default router;

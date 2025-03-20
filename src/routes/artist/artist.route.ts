import { Router } from 'express';
import { GenericController } from '../../controllers/genericController.js';
import Artist from '../../models/Artist.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';

const artistController = new GenericController(Artist);
const router: Router = Router();

router.get('/list', artistController.getAll);
router.get('/:id', isAuthenticated('user&artist') , artistController.get);

export default router;

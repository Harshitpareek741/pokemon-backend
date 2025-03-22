import express from 'express';
import TeamController from '../../controllers/team/teamcontroller.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';



const router = express.Router();

router.post('/', isAuthenticated("user&admin") , (req, res) => TeamController.create(req, res));
router.post('/addmember', isAuthenticated("user&admin"),(req, res) => TeamController.addMember(req, res));
router.get('/:id', isAuthenticated("user&admin"),(req, res) => TeamController.get(req, res));
router.get('/', (req, res) => TeamController.getAll(req, res));
router.put('/:id', isAuthenticated("user&admin"), (req, res) => TeamController.update(req, res));
router.delete('/:id', isAuthenticated("user&admin"), (req, res) => TeamController.delete(req, res));
router.get('/:id/stats', (req, res) => TeamController.stats(req, res));

export default router;

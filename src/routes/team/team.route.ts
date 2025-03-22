import express from 'express';
import TeamController from '../../controllers/team/teamcontroller.js';


const router = express.Router();

router.post('/', (req, res) => TeamController.create(req, res));
router.post('/addmember', (req, res) => TeamController.addMember(req, res));
router.get('/:id', (req, res) => TeamController.get(req, res));
router.get('/', (req, res) => TeamController.getAll(req, res));
router.put('/:id', (req, res) => TeamController.update(req, res));
router.delete('/:id', (req, res) => TeamController.delete(req, res));
router.get('/:id/stats', (req, res) => TeamController.stats(req, res));

export default router;

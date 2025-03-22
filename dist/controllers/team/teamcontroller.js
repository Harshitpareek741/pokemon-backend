var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Team from '../../models/Team.js';
import TeamMembers from '../../models/TeamMembers.js';
class TeamController {
    // Create a team
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const team = yield Team.create(req.body);
                return res.json(team);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // Get a single team by id
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const team = yield Team.findById(req.params.id);
                if (!team)
                    return res.status(404).json({ error: 'Team not found' });
                return res.json(team);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // Get all teams
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teams = yield Team.find();
                return res.json(teams);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // Update team – only allowed if the requester is the team admin
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const team = yield Team.findById(req.params.id);
                if (!team)
                    return res.status(404).json({ error: 'Team not found' });
                if (team.admin !== req.user.id) {
                    return res.status(403).json({ error: 'Only the team admin can update the team' });
                }
                const updatedTeam = yield Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.json(updatedTeam);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    static addMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { TeamId } = req.body;
                const memberCount = yield TeamMembers.countDocuments({ TeamId });
                if (memberCount >= 4) {
                    return res.status(400).json({ error: 'A team can only have up to 4 members' });
                }
                // Assume req.body is pre-validated
                const newMember = yield TeamMembers.create(req.body);
                return res.json(newMember);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // Delete team – only allowed if the requester is the team admin.
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const team = yield Team.findById(req.params.id);
                if (!team)
                    return res.status(404).json({ error: 'Team not found' });
                if (team.admin !== req.user.id) {
                    return res.status(403).json({ error: 'Only the team admin can delete the team' });
                }
                yield TeamMembers.deleteMany({ TeamId: req.params.id });
                yield Team.findByIdAndDelete(req.params.id);
                return res.json({ message: 'Team deleted' });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    // Calculate team statistics (i.e. member count)
    static stats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield TeamMembers.countDocuments({ TeamId: req.params.id });
                return res.json({ teamId: req.params.id, membersCount: count });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
export default TeamController;

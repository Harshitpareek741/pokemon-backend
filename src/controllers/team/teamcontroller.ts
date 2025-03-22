import Team from '../../models/Team.js';
import TeamMembers from '../../models/TeamMembers.js';

class TeamController {
  // Create a team
  static async create(req, res) {
    try {
      const team = await Team.create(req.body);
      return res.json(team);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get a single team by id
  static async get(req, res) {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) return res.status(404).json({ error: 'Team not found' });
      return res.json(team);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all teams
  static async getAll(req, res) {
    try {
      const teams = await Team.find();
      return res.json(teams);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update team – only allowed if the requester is the team admin
  static async update(req, res) {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) return res.status(404).json({ error: 'Team not found' });
      if (team.admin !== req.user.id) {
        return res.status(403).json({ error: 'Only the team admin can update the team' });
      }
      
      const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updatedTeam);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async addMember(req, res) {
    try {
      const { TeamId } = req.body;
      const memberCount = await TeamMembers.countDocuments({ TeamId });
      
      if (memberCount >= 4) {
        return res.status(400).json({ error: 'A team can only have up to 4 members' });
      }
      
      // Assume req.body is pre-validated
      const newMember = await TeamMembers.create(req.body);
      return res.json(newMember);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete team – only allowed if the requester is the team admin.
  static async delete(req, res) {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) return res.status(404).json({ error: 'Team not found' });
      
      if (team.admin !== req.user.id) {
        return res.status(403).json({ error: 'Only the team admin can delete the team' });
      }
      
      await TeamMembers.deleteMany({ TeamId: req.params.id });
      await Team.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Team deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  // Calculate team statistics (i.e. member count)
  static async stats(req, res) {
    try {
      const count = await TeamMembers.countDocuments({ TeamId: req.params.id });
      return res.json({ teamId: req.params.id, membersCount: count });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}



export default TeamController;

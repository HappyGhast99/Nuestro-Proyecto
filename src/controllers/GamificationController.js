const gamificationService = require('../services/GamificationService');

class GamificationController {
  async getProfile(req, res) {
    try {
      const userId = 1; // Mock user ID for prototype
      const profile = await gamificationService.getUserProfile(userId);
      if (!profile) return res.status(404).json({ error: 'User not found' });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async completeActivity(req, res) {
    try {
      const userId = 1; // Mock user ID for prototype
      const { activityId } = req.params;
      const result = await gamificationService.completeActivity(userId, activityId);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'Activity not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new GamificationController();
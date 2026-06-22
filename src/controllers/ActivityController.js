const activityService = require('../services/ActivityService');

class ActivityController {
  async getAllActivities(req, res) {
    try {
      const activities = await activityService.getAllActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createActivity(req, res) {
    const { nombre, instructor, creditos, difficulty } = req.body;
    if (!nombre || !instructor || !creditos) {
      return res.status(400).json({ error: 'Faltan campos requeridos: nombre, instructor, creditos' });
    }
    try {
      const newActivity = await activityService.createActivity(nombre, instructor, creditos, difficulty);
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateActivity(req, res) {
    const { id } = req.params;
    const { nombre, instructor, creditos } = req.body;
    if (!nombre || !instructor || !creditos) {
      return res.status(400).json({ error: 'Faltan campos requeridos: nombre, instructor, creditos' });
    }
    try {
      const changes = await activityService.updateActivity(id, nombre, instructor, creditos);
      if (changes === 0) return res.status(404).json({ error: 'Actividad no encontrada' });
      res.json({ mensaje: 'Actividad actualizada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteActivity(req, res) {
    const { id } = req.params;
    try {
      const changes = await activityService.deleteActivity(id);
      if (changes === 0) return res.status(404).json({ error: 'Actividad no encontrada' });
      res.json({ mensaje: 'Actividad eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ActivityController();
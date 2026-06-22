const express = require('express');
const router = express.Router();
const activityController = require('../controllers/ActivityController');

// Rutas para /cursos (ahora gestionadas por el nuevo controlador)
router.get('/', activityController.getAllActivities);
router.post('/', activityController.createActivity);
router.put('/:id', activityController.updateActivity);
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/GamificationController');

router.get('/user/profile', (req, res) => gamificationController.getProfile(req, res));
router.post('/activities/:activityId/complete', (req, res) => gamificationController.completeActivity(req, res));

module.exports = router;
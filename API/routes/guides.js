const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');
const { verifyToken } = require('../middleware/auth');

// Rutas públicas
router.get('/', guideController.getGuides);
router.get('/:id', guideController.getGuide);

// Rutas protegidas
router.post('/', verifyToken, guideController.createGuide);
router.put('/:id', verifyToken, guideController.updateGuide);
router.put('/:id/status', verifyToken, guideController.changeGuideStatus);
router.delete('/:id', verifyToken, guideController.deleteGuide);

module.exports = router;
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

// Update user role (admin action)
router.put('/update-role', auth, isAdmin, userController.updateUserRole);

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;

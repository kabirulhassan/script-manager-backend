const express = require('express');
const { registerUser, loginUser, getCurrentUser, logoutUser } = require('../controllers/userController');
const auth = require('../middleware/tokenHandler');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', auth, getCurrentUser);

router.post('/logout', logoutUser);

module.exports = router;
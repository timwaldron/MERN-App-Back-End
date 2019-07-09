
const express = require('express');
const router = express.Router();

const { seedOne, seedMany } = require('../controllers/seedController');

router.get('/', seedOne);

module.exports = router;

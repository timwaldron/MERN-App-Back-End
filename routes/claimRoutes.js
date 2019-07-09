
const express = require('express');
const router = express.Router();

const { createClaim /*, seedMany*/ } = require('../controllers/claimController');

router.get('/new', createClaim);

module.exports = router;

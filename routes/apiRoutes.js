
const express = require('express');
const router = express.Router();

router.use('/claim', require('./claimRoutes'));

module.exports = router;

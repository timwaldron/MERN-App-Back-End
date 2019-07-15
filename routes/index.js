const express = require('express');
const cors = require('cors');
const router = express.Router();

// middleware
router.use(express.json())
router.use(cors({ origin: 'https://disclosures.netlify.com' }));

// routing
router.use('/admin', require('./adminRoutes'));
router.use('/claim', require('./claimRoutes'));

module.exports = router;

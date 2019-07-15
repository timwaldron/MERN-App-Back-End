const express = require('express');
const cors = require('cors');
const router = express.Router();

// middleware
router.use(express.json())

if (process.env.ENVIRONMENT === "development") {
  console.log("Loading dev CORS");
  router.use(cors());
}
else
  router.use(cors({ origin: 'https://disclosures.netlify.com' }));


// routing
router.use('/admin', require('./adminRoutes'));
router.use('/claim', require('./claimRoutes'));

module.exports = router;

const express = require('express');
const cors = require('cors');
const router = express.Router();

// middleware
router.use(express.json())

if (process.env.ENVIRONMENT === "development") {
  console.log("Loading dev CORS");
  router.use(cors({ origin: 'http://localhost:3000', credentials: true }));
}
else
  router.use(cors({ origin: 'https://disclosures.netlify.com', credentials: true }));


// routing
router.use('/admin', require('./adminRoutes'));
router.use('/claim', require('./claimRoutes'));
router.use('/business', require('./businessRoutes'));

module.exports = router;

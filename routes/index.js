const express = require('express');
const cors = require('cors');
const router = express.Router();

const { seedData } = require('../utils/seedUtils');
const { checkAccessToken } = require('../controllers/middleware/private')

// middleware
router.use(express.json())

if (process.env.ENVIRONMENT === "development") {
  console.log("Loading dev CORS");
  router.use(cors({ origin: 'http://127.0.0.1:3000', credentials: true, allowedHeaders: "Content-Type,Authorization" }));
} else {
  router.use(cors({ origin: 'https://disclosures.netlify.com', credentials: true, allowedHeaders: "Content-Type,Authorization" }));
}


// routing
router.use('/admin', require('./adminRoutes'));
router.use('/claim', require('./claimRoutes'));
router.use('/business', require('./businessRoutes'));
router.use('/upload', require('./uploadRoutes'));


// seeding route 
router.get('/seed', checkAccessToken, (req, res) => {
  seedData();
  res.status(200).send('Seeded Business and Claims Data')
})

module.exports = router;

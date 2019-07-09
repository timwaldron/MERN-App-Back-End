const express = require('express');
const cors = require('cors');
const router = express.Router();

// middleware
router.use(express.json())
router.use(cors());

// routing
// router.use('/seed', require('./seedRoutes'));
router.use('/claims', require('./claimsRoutes'));


router.use("/", (req, res) => {
  res.status(200).send({status: 200, message: "Service online"});
});

module.exports = router;

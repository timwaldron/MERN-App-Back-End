const express = require('express');
const cors = require('cors');
const router = express.Router();

// middleware
router.use(express.json())
router.use(cors());

// routing
// router.use('/seed', require('./seedRoutes'));
// router.use('/recipe', require('./recipeRoutes'));


router.use("/", (req, res) => {
  res.status(200).send("Hello!");
});

module.exports = router;
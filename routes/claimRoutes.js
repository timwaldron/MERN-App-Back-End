const express = require('express');
const router = express.Router();

const { createClaim, findClaim, addComment /*, seedMany*/ } = require('../controllers/claim/claimController');

router.route('/new')
  .post(createClaim)

router.route('/existing')
  .get(findClaim)
  .post(addComment)



module.exports = router;

const express = require('express');
const router = express.Router();

const { checkAccessToken } = require('../controllers/middleware/private')
const { createClaim, findClaim, addComment, login } = require('../controllers/claim/claimController');


router.route('/new')
  .post(createClaim)


router.route('/existing')
  // .get(findClaim)
  .post(addComment)

router.route('/find')
  .get(checkAccessToken, findClaim)

router.route('/login')
  .post(login)

module.exports = router;

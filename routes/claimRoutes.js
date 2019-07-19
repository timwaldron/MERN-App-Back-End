const express = require('express');
const router = express.Router();

const { createClaim, findClaim, addComment, login } = require('../controllers/claim/claimController');


router.route('/new')
  .post(createClaim)


router.route('/existing')
  .get(findClaim)
  .post(addComment)

router.route('/login')
  .post(login)

module.exports = router;

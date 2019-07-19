const express = require('express');
const router = express.Router();

const { checkAccessToken } = require('../controllers/middleware/private')
const { createClaim, login, findClaim, updatePriority, updateStatus, addComment,  } = require('../controllers/claim/claimController');

router.route('/new')
  .post(createClaim)


router.route('/existing')
  // .get(findClaim)
  .post(addComment)

router.route('/find')
  .get(checkAccessToken, findClaim)

router.route('/login')
  .post(login)

router.route('/update/priority')
  .post(checkAccessToken, updatePriority)

router.route('/update/status')
  .post(checkAccessToken, updateStatus)

router.route('/add/comment')
  .post(checkAccessToken, addComment);

module.exports = router;

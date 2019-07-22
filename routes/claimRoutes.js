const express = require('express');
const router = express.Router();

const { checkAccessToken } = require('../controllers/middleware/private')
const { createClaim, login, findClaim, updatePriority, updateStatus, addComment, getDashboardOpenClaims  } = require('../controllers/claim/claimController');

router.route('/new')
  .post(createClaim)

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

router.route('/find/open')
  .get(checkAccessToken, getDashboardOpenClaims);

module.exports = router;

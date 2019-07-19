const express = require('express')
const router = express.Router()

const { checkAccessToken } = require('../controllers/middleware/private')
const { createBusiness, checkBusinessId, findBusinessName, findAllBusinesses } = require('../controllers/business/businessController')

router.route('/new')
  .post(checkAccessToken, createBusiness);

router.route('/check')
  .get(checkBusinessId);

router.route('/find')
  .get(checkAccessToken, findBusinessName);

router.route('/all')
  .get(checkAccessToken, findAllBusinesses);

module.exports = router

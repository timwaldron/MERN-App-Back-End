const express = require('express')
const router = express.Router()

const { checkAccessToken } = require('../controllers/middleware/private')
const { createBusiness, checkBusinessId } = require('../controllers/business/businessController')

router.route('/new')
  .post(checkAccessToken, createBusiness)

router.route('/check')
  .get(checkBusinessId)

module.exports = router

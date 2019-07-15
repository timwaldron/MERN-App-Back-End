const express = require('express')
const router = express.Router()
const { checkAccessToken } = require('../controllers/middleware/private')
const { login, createBusiness, showDashboard } = require('../controllers/admin/adminController')

router.route('/login')
  .post(login)

router.route('/dashboard')
  .get(checkAccessToken, showDashboard)

router.route('/business/new')
  .post(createBusiness)

module.exports = router

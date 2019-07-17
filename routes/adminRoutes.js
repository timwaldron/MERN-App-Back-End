const express = require('express')
const router = express.Router()
const { checkAccessToken } = require('../controllers/middleware/private')
const { login, showDashboard } = require('../controllers/admin/adminController')
  
router.route('/login')
  .post(login)

router.route('/dashboard')
  .get(checkAccessToken, showDashboard)
  .post(checkAccessToken)
  .put(checkAccessToken)
  .patch(checkAccessToken)
  .delete(checkAccessToken)

module.exports = router

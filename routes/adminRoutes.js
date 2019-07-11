const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { currentUser } = require('../controllers/admin/adminController')

const checkAccessToken = (req, res, next) => {
  const { token } = req.headers
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('incorrect token')
    } else {
      // you have access to decoded here
      req.user = decoded
      next()
    }
  })
}

router.use(checkAccessToken)

router.route('/adminController')
  .get(currentUser)

module.exports = router

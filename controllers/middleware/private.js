const jwt = require('jsonwebtoken')

const checkAccessToken = async (req, res, next) => {
  const { token } = req.cookies
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('you are not authorised')
    } else {
      console.log(decoded)// you have access to decoded here
      next()
    }
  })
}

module.exports = { checkAccessToken }

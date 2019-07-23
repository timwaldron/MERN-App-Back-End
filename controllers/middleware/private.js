const jwt = require('jsonwebtoken')

const checkAccessToken = (req, res, next) => {
  const { token } = req.cookies
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({message: 'You are not authorized', error: err, requestedToken: token })
    } else {
      // console.log(decoded)// you have access to decoded here
      next()
    }
  })
}

module.exports = { checkAccessToken }

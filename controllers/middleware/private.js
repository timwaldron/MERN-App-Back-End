const jwt = require('jsonwebtoken')

const checkAccessToken = (req, res, next) => {
  const { token } = req.cookies
  let printToken = token;
  console.log("Token", printToken.slice(1, 30) + "...", "accessing the path", req.originalUrl);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('you are not authorised')
    } else {
      // console.log(decoded)// you have access to decoded here
      next()
    }
  })
}

module.exports = { checkAccessToken }

const User = require('../models/Admin')
const { checkPassword, generateUser, generateAccessToken } = require('../utils/authUtils').default.default

// register post endpoint
const register = async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    try {
      const findUser = await Admin.findOne({ name: username })
      if (!findUser) {
        const user = await generateUser(username, password)
        const token = await generateAccessToken(user)
        return res.send({ token })
      } else {
        return res.status(403).send('user already exists')
      }
    } catch (err) {
      console.log(err)
      return res.status(404).send('an error occurred')
    }
  } else {
    return res.status(403).send('incorrect credentials')
  }
}

// login post endpoint
const login = async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    try {
      const foundUser = await Admin.findOne({ name: username })
      if (foundUser !== null) {
        const result = await checkPassword(password, foundUser.password)
        if (!result) {
          return res.status(403).send('incorrect credentials')
        } else {
          const token = await generateAccessToken(foundUser)
          return res.send({ token })
        }
      } else {
        return res.status(403).send('incorrect credentials')
      }
    } catch (err) {
      return res.status(404).send('an error occurred')
    }
  } else {
    return res.status(403).send('incorrect credentials')
  }
}

module.exports = {
  register,
  login
}

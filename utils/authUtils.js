const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const generateHash = async (password) => {
  const saltRounds = 10
  const salted = await bcrypt.hash(password, saltRounds)
  return salted
}

const checkPassword = async (password, hash) => {
  const compared = await bcrypt.compare(password, hash)
  return compared
}

const generateUser = async (username, password) => {
  const hash = await generateHash(password)
  const newUser = await Admin.create({
    name: username,
    password: hash
  })
  return newUser
}

const generateAccessToken = ({ name }) => {
  return jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

module.exports = {
  checkPassword,
  generateUser,
  generateAccessToken
}

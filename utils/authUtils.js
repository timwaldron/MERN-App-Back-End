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

const generateAdmin = async (email, password) => {
  try {
    const hash = await generateHash(password)
    const newAdmin = await Admin.create({
      email: email,
      password: hash
    })

    newAdmin.save()
    return newAdmin
  } catch(exception) {
    return { error: "error", message: exception.message };
  }
}

const generateAccessToken = ({ email }) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8h' })
}

module.exports = {
  checkPassword,
  generateAdmin,
  generateAccessToken
}

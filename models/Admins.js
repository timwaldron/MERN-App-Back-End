const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const adminSchema = {
  email: String,
  password: String
}

module.exports = mongoose.model('admin', adminSchema)

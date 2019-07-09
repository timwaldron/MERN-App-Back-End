const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const businessSchema = {
  businessID: String,
  businessName: String, 
  abn: String
}

module.exports = mongoose.model('business', businessSchema)

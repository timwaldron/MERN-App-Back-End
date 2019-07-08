const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const clientSchema = {
  businessID: String,
  businessName: String, 
  abn: String
}

module.exports = mongoose.model('client', clientSchema)

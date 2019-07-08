const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const claimSchema = {
  claimID: String,
  disclosureType: Array,
  actionedDate: String,
  lodgementDate: String,
  comments: Array,
  status: Array,
  claimData: Array
}

module.exports = mongoose.model('claim', claimSchema)

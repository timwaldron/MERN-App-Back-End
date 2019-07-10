const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  claimId: String,          // <ABCD1234>
  businessId: String,       // <ABC001>
  disclosureLevel: String,  // "0", "1", "2"
  categories: Array,
  details: Array,
  status: String,
  comments: Array,
  attachments: Array,
  confirmed: Boolean,
  timestamps: {             // Timestamps
    createdAt: String,
    updatedAt: String,
    actionedAt: String,
    closedAt: String,
  },
});

module.exports = mongoose.model('claim', claimSchema);

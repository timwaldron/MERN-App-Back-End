const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  id: String,               // <ABCD1234>
  businessId: String,       // <ABC001>
  secretKey: String,        // Bcrypt'd
  disclosureLevel: String,  // "0", "1", "2"
  categories: Object,
  details: Object,
  status: Number,
  comments: Array,
  attachments: Array,
  confirmed: Boolean,
  priority: Number,
  timestamps: {             // Timestamps
    createdAt: String,
    updatedAt: String,
    actionedAt: String,
    closedAt: String,
  },
});

module.exports = mongoose.model('claim', claimSchema);

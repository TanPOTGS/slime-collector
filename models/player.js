const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: String
}, {
  timestamps: true
});

playerSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('Player', playerSchema);
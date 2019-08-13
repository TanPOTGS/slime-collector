const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 7;

const playerSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	health: {type: Number, default: 10},
	canFight: {type: Boolean, default: true}
}, {
  timestamps: true
});

//Using Mongoose's set method on the schema to make sure
//that the player's password isn't included when turned
//into JSON and sent to the browser.
playerSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

playerSchema.pre('save', function(next) {
  // this will be set to the current document
  const player = this;
	if (!player.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(player.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the player provided password with the hash
    player.password = hash;
    next();
  });
});

playerSchema.methods.comparePassword = function(tryPassword, cb) {
  //'this' represents the document that you called comparePassword on.
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Player', playerSchema);
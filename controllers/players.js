const Player = require('../models/player');

module.exports = {
  signup
};

async function signup(req, res) {
	//When this signup function is called
	//by the server a new player object is 
	//created based off the Player model.
	const player = new Player(req.body);
	
	//Then, the player object is saved and
	//the server responds with JSON of the
	//newly create player.
  try {
    await player.save();
    // TODO: Send back a JWT instead of the user
    res.json(player);
  } catch (err) {
    // Probably a duplicate username
    res.status(400).json(err);
  }
}
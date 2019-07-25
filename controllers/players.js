const Player = require('../models/player');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

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
    const token = createJWT(player);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate username
    res.status(400).json(err);
  }
}

//This function will use the sign method from
//the jwt library to create the token. This function
//will be called when the player signs up or logs in.
function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
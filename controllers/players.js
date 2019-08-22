const Player = require('../models/player');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
	signup,
	createJWT,
	login,
	updatePlayerData
};

async function signup(req, res) {
	//When this signup function is called by the server a new
	//player object is created based off the Player model.
	const player = new Player(req.body);
	
	//Then, the player object is saved and the server responds with
	//JSON of the newly create player.
  try {
    await player.save();
    const token = createJWT(player);
    res.json({ token });
  } catch (err) {
    //Probably a duplicate username
    res.status(400).json(err);
  }
}

//This function will use the sign method from the jwt library to
//create the token. This function will be called when the player
//signs up or logs in.
function createJWT(player) {
  return jwt.sign(
    {player}, //data payload
    SECRET,
    {expiresIn: '24h'}
  );
}

async function login(req, res) {
  try {
		//Try to find a Player model in the database by its username
		const player = await Player.findOne({username: req.body.username});
		//If such a player doesn't exist, return an error.
		//This error will be used in the login page, and displayed under
		//the login form if the an error is return upon login.
		if (!player) return res.status(401).json({err: 'bad credentials'});
		//comparePassword is defined in player.js, and is only called on
		//the instance of the model that called it.
    player.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(player);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function updatePlayerData(req, res) {
  try {
		await Player.updateOne({id: req.body.id}, {$set: req.body});
		console.log(req.body)
		return res.json();
  } catch (err) {
    return res.status(401).json(err);
  }
}
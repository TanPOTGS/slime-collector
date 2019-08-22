const express = require('express');
const router = express.Router();
const playersCtrl = require('../../controllers/players');

/*---------- Public Routes ----------*/
router.post('/signup', playersCtrl.signup);
router.post('/login', playersCtrl.login);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.put('/:id', playersCtrl.updatePlayerData);

/*---------- Helper Functions ----------*/
// function checkAuth(req, res, next) {
//   if (req.user) return next();
//   return res.status(402).json({msg: 'Not Authorized'});
// }

//I'd like to get this working at some point. It will protect the route that call the checkAuth middleware

module.exports = router;
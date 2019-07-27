const express = require('express');
const router = express.Router();
const playersCtrl = require('../../controllers/players');

/*---------- Public Routes ----------*/
router.post('/signup', playersCtrl.signup);
router.post('/login', playersCtrl.login);



/*---------- Protected Routes ----------*/




module.exports = router;
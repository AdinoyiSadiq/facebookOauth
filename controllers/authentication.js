const jwt = require('jwt-simple');
const keys = require('../config/keys')

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

exports.signin = function(req, res, next) {
	// User has already been auth'd
	// We just need to give them a token
	// res.send({ token: tokenForUser(req.user) })
	res.redirect('/login/?=' + tokenForUser(req.user))
}
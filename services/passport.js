const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys')

const User = mongoose.model('users');

passport.use(
	new FacebookStrategy({
		clientID: keys.facebookClientID,
		clientSecret: keys.facebookClientSecret,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'email']
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ facebookId: profile.id })
			.then((existingUser) => {
				if (existingUser) {
					// we already have a record with the given profile ID
					done(null, existingUser);
				} else {
					// we don't have a user record with this ID, make a new record!
					new User({ facebookId: profile.id, email: profile.emails[0].value })
						.save()
						.then(user => done(null, user));
				}
			})
	})
);

	const LocalStrategy = require('passport-local').Strategy;
	const mongoose = require('mongoose');
	const bcrypt = require('bcryptjs');

	const Seller = require('../app/models/seller');
	const Buyer = require('../app/models/buyer');

	function SessionConstructor(userId, userGroup, details) {
		this.userId = userId;
		this.userGroup = userGroup;
		this.details = details;
	}

	module.exports = function(passport) {

		passport.serializeUser(function (userObject, done) {
			let userGroup = "seller";
			let userPrototype = Object.getPrototypeOf(userObject);

			if (userPrototype === Seller.prototype) {
				userGroup = "seller";
			} else if (userPrototype === Buyer.prototype) {
				userGroup = "buyer";
			}

			let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
			done(null,sessionConstructor);
		});

		passport.deserializeUser(function (sessionConstructor, done) {

			if (sessionConstructor.userGroup == 'seller') {
				Seller.findOne({
					_id: sessionConstructor.userId
				}, '-localStrategy.password', function (err, user) {
					done(err, user);
				});
			} else if (sessionConstructor.userGroup == "buyer"){
				Buyer.findOne({
					_id: sessionConstructor.userId
				}, '-localStrategy.password', function (err, user) {
					done(err, user);
				});
			}
		});

		passport.use('local-seller', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

				// Match User
				Seller.findOne({ email:email })
				.then(result => {
					if(!result) {
						return done(null, false, { message: 'Email is not registered' })
					}

					// Match Password
					bcrypt.compare(password, result.password, (err, isMatch) => {
						if(err) throw err;

						if(isMatch) {
							
							return done(null, result)
						} else {
							return done(null, false, { message: 'Password incorrect' })
						}
					})
				})
				.catch(err => console.log(err));

			}))

		passport.use('local-buyer', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

				// Match User
				Buyer.findOne({ email:email })
				.then(result => {
					if(!result) {
						return done(null, false, { message: 'Email is not registered' })
					}

					// Match Password
					bcrypt.compare(password, result.password, (err, isMatch) => {
						if(err) throw err;

						if(isMatch) {
							
							return done(null, result)
						} else {
							return done(null, false, { message: 'Password incorrect' })
						}
					})
				})
				.catch(err => console.log(err));

			}))
	}
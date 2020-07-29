
	const bcrypt = require('bcryptjs');
	const passport = require('passport');
	const bpassport = require('passport');

	const Seller = require('../models/seller');
	const Buyer = require('../models/buyer');

	exports.register = function(req, res, next) {

		fname = req.body.fname;
		lname = req.body.lname;
		gender = req.body.gender;
		email = req.body.email;
		password = req.body.password;

			Seller.findOne({email:email}, function(err, result){
				if(err) {
					res.send(err);
				}

				if(result){
					res.send("You can't use this email");
				} else {
					const nSeller = new Seller({
						fname: fname,
						lname: lname,
						gender: gender,
						email: email,
						password: password
					})

						bcrypt.genSalt(5, (err, salt) =>
						bcrypt.hash(nSeller.password, salt, (err, hash) => {
							if(err) throw err;
							// Set pasword to hashed
							nSeller.password = hash;
							// Save user
							nSeller.save()
							.then(result => {
								res.send('You are now registered and can log in');
								// res.redirect('/seller/login');
							})
							.catch(err => console.log(err));
						}))


				// 	nSeller.save(function(err){
				// 		if(err){
				// 			res.send(err);
				// 		} else {
				// 			res.send("User successfully saved to DB");
				// 		}
				// 	})
				 }
			});
	}

	// exports.login = function(req, res, next) {

		  
	// 		res.send("Successful");

	// 	Seller.findOne({email:req.query.email, password:req.query.password},function(err, result){
	// 		if(err){
	// 			res.send(err);
	// 		}

	// 		//console.log(result);

	// 		if(result){
	// 			res.send(result);
	// 		} else {
	// 			res.send("No result");
	// 		}

	// 	});
	// }

	exports.buyerRegister = function(req, res, next) {

		companyName = req.body.companyName;
		country = req.body.country;
		fname = req.body.fname;
		lname = req.body.lname;
		roleInCompany = req.body.roleInCompany;
		companyWebsite = req.body.companyWebsite;
		email = req.body.email;
		phoneNumber = req.body.phoneNumber;
		password = req.body.password;

			Buyer.findOne({email:email}, function(err, result){
				if(err) {
					res.send(err);
				}

				if(result){
					res.send("You can't use this email");
				} else {
					const nBuyer = new Buyer({
						companyName: companyName,
						country: country,
						fname: fname,
						lname: lname,
						roleInCompany: roleInCompany,
						companyWebsite: companyWebsite,
						email: email,
						phoneNumber: phoneNumber,
						password: password
					})

						bcrypt.genSalt(5, (err, salt) =>
						bcrypt.hash(nBuyer.password, salt, (err, hash) => {
							if(err) throw err;
							// Set pasword to hashed
							nBuyer.password = hash;
							// Save user
							nBuyer.save()
							.then(result => {
								res.send('You are now registered and can log in');
								// res.redirect('/buyer/login');
							})
							.catch(err => console.log(err));
						}))

					// 	nBuyer.save(function(err){
					// 	if(err){
					// 		res.send(err);
					// 	} else {
					// 		res.send("User successfully saved to DB");
					// 	}
					// })

				}
			});
	}

	// exports.buyerLogin = function(req, res, next) {

		  
	// 		res.send("Successful");

	// 	Buyer.findOne({email:req.query.email, password:req.query.password},function(err, result){
	// 		if(err){
	// 			res.send(err);
	// 		}

	// 		//console.log(result);

	// 		if(result){
	// 			res.send(result);
	// 		} else {
	// 			res.send("No result");
	// 		}

	// 	});
	// }



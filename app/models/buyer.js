
	const mongoose = require('mongoose');

		const buyerSchema = new mongoose.Schema({
			companyName: String,
			country: String,
			fname: String,
			lname: String,
			roleInCompany: String,
			companyWebsite: String,
			email: String,
			phoneNumber: String,
			password: String
		})

		module.exports = mongoose.model('Buyer', buyerSchema);
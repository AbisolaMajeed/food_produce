
	
	const mongoose = require('mongoose');

	const productSchema = new mongoose.Schema({

		productName: String
	})

	module.exports = mongoose.model('Product', productSchema);


	const Product = require('../models/product');

	exports.viewProducts = function(req, res, next) {

		Product.find(function(err, result){

			if(err){
				res.send(err);
			} else {
				res.send(result);
			}
		});
	}


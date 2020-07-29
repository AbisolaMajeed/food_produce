
	const Offer = require('../models/offer');

	exports.uploadOffers = function(req, res, next) {

		const newOffer = new Offer({
				email: req.body.email,
				product: req.body.product,
				tonnage: req.body.tonnage,
				origin: req.body.origin,
				moistureContent: req.body.moistureContent,
				stockLocation: req.body.stockLocation,
				packagePerBag: req.body.packagePerBag,
				numberOfBags: req.body.numberOfBags,
				inspection: req.body.inspection
		});

		newOffer.save(function(err){
			if(err){
				res.send(err);
			} else {
				res.send("Product Data has been Captured");
			}
		});
	}

	exports.viewOffers = function(req, res, next) {

		Offer.find({email:req.params.email}, function(err, result){

				if(err){
					res.send(err);
				} else {
					res.send(result);
				}
		});
	}

	exports.buyerDisplayOffers = function(req, res, next) {

		Offer.find({product:req.params.product}, function(err, result){

			if(err){
				res.send(err);
			} else {
				res.send(result);
			}
		});
	}

	module.exports = {
		ensureAuthenticated: function(req, res, next) {
			if(req.isAuthenticated()){
				return next();
			}
			res.send('Please log in to view this resource');
			res.redirect('/seller/login');
			// res.redirect('/buyer/login');
		}
	}
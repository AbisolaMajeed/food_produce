
	const express = require("express"),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');

	const session = require('express-session');
	const passport = require('passport');
	 // const bpassport = require('passport');

		require('./config/passport')(passport);
		// require('./config/bpassport')(bpassport);

		const app = express();

		const db = require('./config/database');
		const route = require('./app/routes');

		mongoose.connect(db.url, {useNewUrlParser:true, useUnifiedTopology:true});
		app.use(bodyParser.urlencoded({extended:true}));

		app.use(session({
		  secret: 'secret',
		  resave: true,
		  saveUninitialized: true
		}));

			// Passport middleware
		app.use(passport.initialize());
		app.use(passport.session());

		// app.use(bpassport.initialize());
		// app.use(bpassport.session());

		app.use('/routes', require('./app/routes'));

		route(app);

		app.listen(process.env.PORT || 2020, function(){
			console.log('Server started on port 2020')
		})
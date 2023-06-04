const express = require('express'),
	passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', async (req, res) => {
	try {
		let user = new User({
			username: req.body.username
		});
		let registeredUser = await User.register(user, req.body.password);
		req.login(registeredUser, function(err) {
			if (err) {
				console.log(err);
				return res.redirect('/register');
			}
			res.redirect('/hotels');
		});
	} catch (error) {
		console.log(error);
		return res.redirect('/register');
	}
});

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	(req, res) => {
		let redirectUrl = req.session.returnTo || '/hotels';
		// delete req.session.returnTo;
		res.redirect(redirectUrl);
	}
);

router.get('/logout', (req, res) => {
	req.logout();

	res.redirect('/hotels');
});

module.exports = router;

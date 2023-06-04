const express = require('express'),
	{ isLoggedIn } = require('../middlewares/index');
const router = express.Router();
const User = require('../models/user');

router.get('/users/:id', isLoggedIn, async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		res.render('users/show', { user });
	} catch (error) {
		console.log(error);
		res.redirect('/hotels');
	}
});
router.get('/users/:id/edit', async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		res.render('users/edit', { user });
	} catch (error) {
		console.log(error);
		res.redirect('/hotels');
	}
});
router.patch('/users/:id', async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body.user);

		res.redirect(`/users/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect(`/users/${req.params.id}`);
	}
});
// router.delete('/users/:id';)

module.exports = router;

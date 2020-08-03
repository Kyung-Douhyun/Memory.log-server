const { User } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { username, email, password } = req.body;
		User.findOrCreate({
			where: {
				email,
			},
			defaults: {
				username,
				password,
			},
		})
			.then(([user, created]) => {
				if (!created) {
					res.status(409).send('404 NOT FOUND');
				}
				const data = user.get({ plain: true });
				console.log(data);
				res.status(200).json(data);
			})
			.catch(err => res.status(500).send(err));
	},
};

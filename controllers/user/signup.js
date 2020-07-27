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
					res.status(409).send('Existing user');
				}
				const data = user.get({ plain: true });
				res.status(200).json(data);
			})
			.catch(err => res.send(err));
	},
};

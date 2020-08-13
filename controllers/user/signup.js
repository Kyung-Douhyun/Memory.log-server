const { User } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { username, email, password, profilepath } = req.body;
		User.findOrCreate({
			where: {
				email,
			},
			defaults: {
				username,
				password,
				profilepath,
			},
		})
			.then(([user, created]) => {
				if (!created) {
					res.status(409).send('CONFLICT');
				}
				const data = user.get({ plain: true });
				// console.log(data);
				res.status(200).send(data);
			})
			.catch(err => res.status(500).send(err));
	},
};

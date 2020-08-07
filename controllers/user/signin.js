const { User } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { email, password } = req.body;
		const sess = req.session;

		User.findOne({
			where: { email, password },
		})
			.then(data => {
				if (!data) {
					res.status(401).send('Invalid user or Wrong password');
				} else {
					// console.log('data:', data.id);
					sess.userid = data.id;
					sess.username = data.username;
					// console.log('session:', sess);
					res.status(200).send(data);
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

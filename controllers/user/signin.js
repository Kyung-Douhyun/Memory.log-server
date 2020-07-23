const { User } = require('../../models/');

module.exports = {
	post: (req, res) => {
		const { email, password } = req.body;
		const sess = req.session;

		User.findOne({
			where: { email, password },
		}).then(data => {
			if (!data) {
				res.status(404).send('Invalid user');
			} else {
				console.log('data:', data.id);
				sess.userid = data.id;
				sess.username = data.username;
				console.log('session:', sess);
				res.status(200).send(data);
			}
		});
	},
};

module.exports = {
	post: (req, res) => {
		const sess = req.session;
		if (sess.userid) {
			req.session
				.destroy(err => {
					if (err) {
						throw err;
					} else {
						res.send('successfully signed out!');
					}
				})
				.catch(err => res.status(500).send(err));
		} else {
			res.status(400).send("you're currently not logined");
		}
	},
};

module.exports = {
	post: async (req, res) => {
		const sess = req.session;
		if (sess.userid) {
			await req.session.destroy(err => {
				if (err) throw new Error('session error');
				res.status(200).send('successfully signed out!');
			});
		} else {
			res.status(400).send("you're currently not logined");
		}
	},
};

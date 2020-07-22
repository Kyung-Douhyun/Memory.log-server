
module.exports = {
	post: (req, res) => {
		const sess = req.session;
		if (sess.userid) {
			req.session.destroy(err => {
				if (err) {
					throw err;
				} else {
					res.send('successfully signed out!');
				}
			});
		} else {
			res.send('uh-oh');
		}
	},
};

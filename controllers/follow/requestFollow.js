const { Follow } = require('../../models');
// follow 버튼을 눌렀을시, follow 요청.
module.exports = {
	post: (req, res) => {
		const { followId } = req.body;
		const { userId } = req.session.userid;
		Follow.create({
			userId,
			followId,
		})
			.then(newData => {
				if (newData) {
					Follow.create({
						userId: followId,
						followId: null,
					})
						.then(newData => {
							if (newData) {
								Follow.findAll()
									.then(follow => res.status(200).send(follow))
									.catch(err => res.send(err));
							}
						})
						.catch(err => res.send(err));
				}
			})
			.catch(err => res.send(err));
	},
};

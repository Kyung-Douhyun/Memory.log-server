const { Follow } = require('../../models');
// follow 신청 취소
module.exports = {
	post: (req, res) => {
		const { followId } = req.body;
		const { userId } = req.session.userid;
		Follow.destroy({
			where: {
				userId,
				followId,
			},
		})
			.then(success => {
				if (success) {
					Follow.destroy({
						where: {
							userId: followId,
							followId: null,
						},
					})
						.then(success => Follow.findByPk(success))
						.then(follow => res.status(200).send(follow))
						.catch(err => res.send(err));
				}
			})
			.catch(err => res.send(err));
	},
};

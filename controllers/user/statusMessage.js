const { User } = require('../../models');
// 유저의 상태 메세지 변경 요청.
module.exports = {
	post: (req, res) => {
		const { statusMessage } = req.body;
		const { userId } = req.session.userid;
		User.update(
			{
				statusMessage,
			},
			{
				where: {
					id: userId,
				},
			},
		)
			.then(() => User.findOne({ where: { id: userId } }))
			.then(user => res.status(200).send(user))
			.catch(err => res.status(500).send(err));
	},
};

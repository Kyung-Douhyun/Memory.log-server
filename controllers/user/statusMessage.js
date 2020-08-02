const { User } = require('../../models');
// 유저의 상태 메세지 변경 요청.
module.exports = {
	post: (req, res) => {
		const { statusmessage } = req.body;
		User.update(
			{
				statusmessage,
			},
			{
				where: {
					// id: req.session.userid,
					id: 8,
				},
			},
		)
			.then(() => User.findOne({ where: { id: req.session.userid } }))
			.then(user => res.status(200).send(user))
			.catch(err => res.status(500).send(err));
	},
};

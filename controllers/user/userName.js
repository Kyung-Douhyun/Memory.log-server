const { User } = require('../../models');
// 유저의 상태 메세지 변경 요청.
module.exports = {
	post: (req, res) => {
		const { username } = req.body;
		User.update(
			{
				username,
			},
			{
				where: {
					id: req.session.userid,
					// id: 21,
				},
			},
		)
			.then(() => User.findOne({ where: { id: req.session.userid } }))
			// .then(() => User.findOne({ where: { id: 21 } }))
			.then(user => res.status(200).send(user))
			.catch(err => res.status(500).send(err));
	},
};

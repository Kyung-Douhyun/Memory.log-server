const { Follow } = require('../../models');
// 친구 초대 수락
module.exports = {
	post: (req, res) => {
		const { userId } = req.session.userid;
		const { id, follower } = req.body;
		Follow.update(
			{
				followId: follower,
			},
			{
				where: {
					id,
				},
			},
		)
			.then(() => Follow.findAll({ where: { userId } }))
			.then(list => res.status(200).send(list))
			.catch(err => res.send(err));
	},
};

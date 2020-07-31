const { Follow } = require('../../models');
const { User } = require('../../models');
// 친구 초대 수락
module.exports = {
	post: (req, res) => {
		// const { userId } = req.session.userid;
		const { email } = req.body;
		User.findOne({
			where: {
				email,
			},
		})
			.then(user => {
				if (!user) {
					res.status(404).send('존재하지 않는 유저입니다.');
				} else {
					Follow.findOne({
						where: {
							userId: user.id,
							followId: 1, // 임시
							// followId: req.session.userid,
						},
					})
						.then(followList => {
							if (followList) {
								Follow.update(
									{
										followId: user.id,
									},
									{
										where: {
											userId: 1, // 임시
											// userId: req.session.userid,
											followId: null,
										},
									},
								);
							} else {
								res.status(404).send('친구요청 기록이 없습니다.');
							}
						})
						.catch(err => res.status(500).send(err));
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

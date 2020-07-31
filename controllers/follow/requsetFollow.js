const { Follow } = require('../../models');
const { User } = require('../../models');
// follow 버튼을 눌렀을시, follow 요청.
module.exports = {
	post: (req, res) => {
		const { email } = req.body; // test06@test.net
		User.findOne({
			where: {
				email,
			},
		})
			.then(user => {
				if (!user) {
					res.status(404).send('존재하지 않는 유저입니다.');
				} else {
					Follow.findOrCreate({
						where: {
							userId: 1, // 현재 로그인 되어있는 유저.
							// userId: req.session.userid,
							followId: user.id, // 6
						},
					})
						.then(([list, created]) => {
							if (!created) {
								res.status(409).send('이미 존재하는 요청입니다.');
							} else {
								res.status(201).send(list);
							}
						})
						.catch(err => res.status(500).send(err));
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

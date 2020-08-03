const { User } = require('../../models');
// 세션 userid 주소를 기준으로 유저의 정보를 요청.
module.exports = {
	post: (req, res) => {
		User.findOne({
			where: {
				id: req.session.userid,
			},
		})
			.then(user => {
				if (!user) {
					res.status(404).json('404 NOT FOUND');
				}
				res.status(200).send([user]);
			})
			.catch(err => res.status(500).send(err));
	},
};

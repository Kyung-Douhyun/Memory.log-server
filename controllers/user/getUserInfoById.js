const { User } = require('../../models');
// email 주소를 기준으로 유저의 정보를 요청.
module.exports = {
	post: (req, res) => {
		User.findOne({
			where: {
				id: req.body.id,
			},
		})
			.then(user => res.status(200).send(user))
			.catch(err => res.status(500).send(err));
	},
};

const { Follow } = require('../../models');
const { User } = require('../../models');
// 친구 목록 탭을 클릭했을시, 자신의 친구 목록을 요청.
module.exports = {
	post: (req, res) => {
		const { userId } = req.session.userid;
		Follow.findAll({
			include: [
				{
					model: User,
					attributes: [{ id: userId }],
				},
			],
			where: { userId },
			transaction,
		})
			.then(list => {
				res.status(200).send(list);
			})

			.catch(err => res.send(err));
	},
};

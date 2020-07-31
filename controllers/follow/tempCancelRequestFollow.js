// const { Follow } = require('../../models');
// // follow 신청 취소
// module.exports = {
// 	post: (req, res) => {
// 		const { followId } = req.body;
// 		const { userId } = req.session.userid;
// 		Follow.destroy({
// 			where: {
// 				userId,
// 				followId,
// 			},
// 		})
// 			.then(success => {
// 				if (success) {
// 					Follow.destroy({
// 						where: {
// 							userId: followId,
// 							followId: null,
// 						},
// 					})
// 						.then(success => Follow.findByPk(success))
// 						.then(follow => res.status(200).send(follow))
// 						.catch(err => res.send(err));
// 				}
// 			})
// 			.catch(err => res.send(err));
// 	},
// };

const { Follow } = require('../../models');
const { User } = require('../../models');
// unfollow 취소
module.exports = {
	post: (req, res) => {
		const { email } = req.body;

		User.findOne({
			where: {
				email,
			},
		}).then(user => {
			if (!user) {
				res.status(404).send('존재하지 않는 유저입니다.');
			} else {
				Follow.update(
					{ followId: null },
					{
						where: {
							userId: user.id,
							followId: req.session.userid,
						},
					},
				).then(result => {
					if (result) {
						Follow;
					}
				});
			}
		});
	},
};

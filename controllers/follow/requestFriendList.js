const { Follow } = require('../../models');
const { User } = require('../../models');
const { Op } = require('sequelize');
// 친구 목록 탭을 클릭했을시, 자신의 친구 목록을 요청.
module.exports = {
	post: (req, res) => {
		const followerId = [];
		Follow.findAll({
			where: {
				userId: 1, // 임시
				// userId: req.session.userid,
			},
		})
			.then(list => {
				if (!list) {
					res.status(404).send('친구가 없습니다...');
				} else {
					for (let ele of list) {
						followerId.push(ele.followId);
					}
					User.findAll({
						where: {
							id: {
								[Op.or]: followerId,
							},
						},
					})
						.then(followerList => {
							// console.log(followerList);
							res.status(200).send(followerList);
						})
						.catch(err => res.status(500).send(err));
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

const { Follow } = require('../../models');
const { User } = require('../../models');
const { Op } = require('sequelize');
// 친구 목록 탭을 클릭했을시, 자신의 친구 목록을 요청.
module.exports = {
	post: (req, res) => {
		const followerId = [];
		Follow.findAll({
			where: {
				userId: req.session.userid,
			},
		})
			.then(list => {
				if (list.length === 0) {
					res.status(200).json([]);
				} else {
					for (let ele of list) {
						followerId.push(ele.followId);
					}
					// console.log(followerId);
					User.findAll({
						where: {
							id: {
								[Op.or]: followerId,
							},
						},
					})
						.then(followerList => {
							res.status(200).json(followerList);
						})
						.catch(err => res.status(500).send(err));
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

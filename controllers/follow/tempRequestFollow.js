// const { Follow } = require('../../models');
// // follow 버튼을 눌렀을시, follow 요청.
// module.exports = {
// 	post: (req, res) => {
// 		const { followId } = req.body;
// 		const { userId } = req.session.userid;
// 		Follow.findOrCreate({
// 			userId,
// 			followId,
// 		})
// 			.then(newData => {
// 				if (newData) {
// 					Follow.create({
// 						userId: followId,
// 						followId: null,
// 					})
// 						.then(newData => {
// 							if (newData) {
// 								Follow.findAll()
// 									.then(follow => res.status(200).send(follow))
// 									.catch(err => res.status(500).send(err));
// 							}
// 						})
// 						.catch(err => res.status(500).send(err));
// 				}
// 			})
// 			.catch(err => res.status(500).send(err));
// 	},
// };

const { Follow } = require('../../models');
// follow 버튼을 눌렀을시, follow 요청.
module.exports = {
	post: (req, res) => {
		const { followId } = req.body;
		// const { userId } = req.session.userid;
		Follow.findOrCreate({
			where: {
				userId: 1, // 임시
				followId,
			},
		})
			.then(([response, created]) => {
				if (!created) {
					res.status(409).send('이미 추가 혹은 추가요청한 친구입니다');
				} else {
					Follow.create({
						userId: followId,
						followId: null,
					})
						.then(response => {
							if (response) {
								Follow.findAll()
									.then(list => res.status(200).send(list))
									.catch(err => res.status(500).send(err));
							}
						})
						.catch(err => res.status(500).send(err));
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

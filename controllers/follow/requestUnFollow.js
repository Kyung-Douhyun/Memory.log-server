const { Follow } = require('../../models');
// const { User } = require('../../models');
// unfollow 요청
module.exports = {
	post: (req, res) => {
		const { id } = req.body; // 3
		Follow.destroy({
			where: {
				userId: req.session.userid,
				followId: id,
			},
		})
			.then(result => {
				// console.log('삭제한 Follows 테이블 레코드 ID :', result);
				if (!result) {
					res.status(404).json('404 NOT FOUND');
				} else {
					Follow.findAll({
						where: {
							userId: req.session.userid,
						},
					})
						.then(list => {
							// console.log('프라미스 리스트 객체 :', list);
							res.status(200).send(list);
						})
						.catch(err => res.status(500).send(err));
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

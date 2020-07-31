const { Follow } = require('../../models');
// const { User } = require('../../models');
// unfollow 요청
module.exports = {
	post: (req, res) => {
		const { id } = req.body; // 3
		// const { userid } = req.session; // 1
		Follow.destroy({
			where: {
				// userId: userid,
				userId: 1,
				followId: id,
			},
		})
			.then(result => {
				// console.log('삭제한 Follows 테이블 레코드 ID :', result);
				if (!result) {
					res.status(404).send('존재하지 않는 팔로워입니다.');
				} else {
					Follow.findAll({
						where: {
							userId: 1,
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

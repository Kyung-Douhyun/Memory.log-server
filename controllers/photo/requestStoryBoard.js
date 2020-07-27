const { Photo } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { userId } = req.session.userid;
		Photo.findAll({
			where: {
				userId,
			},
			order: [['createdAt', 'DESC']],
		})
			.then(photo => {
				res.status(200).send(photo);
			})
			.catch(err => res.status(500).send('서버 에러 :', err));
	},
};

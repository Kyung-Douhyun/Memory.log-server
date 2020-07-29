const { Photo } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { userId } = req.session.userid;
		Photo.findAll({
			where: {
				// userId,
			},
			order: [['createdAt', 'DESC']],
		})
			.then(photo => {
				// console.log(photo);
				res.status(200).json(photo);
			})
			.catch(err => res.send(err));
	},
};

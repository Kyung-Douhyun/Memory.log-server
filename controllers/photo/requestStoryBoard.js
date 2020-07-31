const { Photo } = require('../../models');

module.exports = {
	post: (req, res) => {
		Photo.findAll({
			where: {
				// userId: req.session.userid
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

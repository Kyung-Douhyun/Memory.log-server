const { Photo } = require('../../models');

module.exports = {
	post: (req, res) => {
		// const { user } = req.session.userid;
		Photo.findAll({
			where: {
				// userId: user,
			},
			order: [['createdAt', 'DESC']],
		})
			.then(photo => {
				console.log(photo);
				res.status(200).json(photo);
			})
			.catch(err => res.send(err));
	},
};

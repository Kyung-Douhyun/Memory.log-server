const { Photo } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { userId, location, filepath, description } = req.body;

		Photo.findOrCreate({
			where: {
				filepath,
			},
			defaults: {
				userId,
				location,
				description,
			},
		})
			.then(async ([photo, created]) => {
				if (!created) {
				}
				const data = await photo.get({ plain: true });
				res.status(200).json(data);
			})
			.catch(err => res.send(err));
	},
};

const { Photo } = require('../../models/Photo');

module.exports = {
	post: (req, res) => {
		const { location, filepath, description } = req.body;

		Users.findOrCreate({
			where: {
				filepath,
			},
			defaults: {
				location,
				description,
			},
		}).then(async ([photo, created]) => {
			if (!created) {
			}
			const data = await photo.get({ plain: true });
			res.status(200).json(data);
		});
	},
};

const { Photo } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { filepath, description } = req.body;
		Photo.update(
			{
				description,
			},
			{
				where: {
					filepath,
				},
			},
		)
			.then(() =>
				Photo.findOne({
					where: {
						filepath,
					},
				})
					.then(photo => res.status(200).send(photo))
					.catch(err => res.status(500).send(err)),
			)
			.catch(err => res.status(500).send(err));
	},
};

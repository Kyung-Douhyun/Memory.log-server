const { Photo } = require('../../models');
const { Follow } = require('../../models');

module.exports = {
	post: (req, res) => {
		Follow.findOne({
			where: {
				userId: req.body.id,
				followId: req.session.userid,
			},
		})
			.then(response => {
				if (!response) {
					res.status(404).send('404 NOT FOUND');
				} else {
					Photo.findAll({
						where: {
							userId: req.body.id,
						},
						order: [['createdAt', 'DESC']],
					})
						.then(photo => {
							res.status(200).json(photo);
						})
						.catch(err => res.status(500).send(err));
				}
			})
			.catch(err => res.status(500).send(err));
	},
};

const { Photo } = require('../../models');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	region: 'ap-northeast-2',
});

module.exports = {
	post: (req, res) => {
		const { filepath } = req.body;
		const url = filepath.split('/');
		const key = url[url.length - 1];
		const params = {
			Bucket: 'memory-log',
			Key: key,
		};
		s3.deleteObject(params, (err, data) => {
			if (err) {
				console.log(err + `AWS S3에서 filepath: ${filepath} 사진을 삭제하는데 실패하였습니다.`);
			} else if (data) {
				console.log(data);
				Photo.destroy({
					where: {
						filepath,
					},
				})
					.then(() =>
						Photo.findAll({
							where: {
								userId: req.session.userid,
							},
						})
							.then(photo => res.status(200).send(photo))
							.catch(err => res.status(500).send('서버 에러 :', err)),
					)
					.catch(err => res.status(500).send('서버 에러 :', err));
			}
		});
	},
};

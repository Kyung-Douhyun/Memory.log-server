const router = require('express').Router();
const { Photo } = require('../models');
const { photoController } = require('../controllers/');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
AWS.config.update({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	region: 'ap-northeast-2',
});
const s3 = new AWS.S3();
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'memory-log',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read-write',
		key: (req, file, cb) => {
			cb(null, req.session.username + '_' + req.session.userid + '_' + file.originalname);
		},
	}),
});

router.post('/sboard', photoController.sboard.post);
router.post('/upload', upload.single('img'), (req, res) => {
	const { location, description } = req.body;
	const { userId } = req.session.userid;
	try {
		console.log('req.file: ', req.file);
		let payLoad = { url: req.file.location };
		Photo.create({
			filepath: payLoad.url,
			userId,
			location,
			description,
		})
			.then(async photo => {
				const data = await photo.get({ plain: true });
				res.status(200).json(data);
			})
			.catch(err => res.send(err));
	} catch (err) {
		console.log(err);
		res.status(500).send('서버 에러');
	}
});
module.exports = router;

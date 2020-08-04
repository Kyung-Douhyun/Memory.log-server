const router = require('express').Router();
const { Photo } = require('../models');
const { photoController } = require('../controllers/');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	region: 'ap-northeast-2',
});
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

router.post('/sboard', photoController.requestStoryBoard.post); // 유저의 스토리보드 요청
router.post('/fboard', photoController.requestFriendStoryBoard.post); // 친구의 스토리보드 요청
router.post('/uboard', photoController.updateDescription.post); // 유저의 사진 디스크립션 업데이트
router.post('/dphoto', photoController.deletePhoto.post); // 유저의 사진 삭제
router.post('/upload', upload.single('img'), (req, res) => {
	const { location, description } = req.body;
	try {
		// console.log('req.file: ', req.file);
		// console.log('req.body: ', req.body);
		// console.log('req.session: ', req.session);
		let payLoad = req.file;
		Photo.create({
			filepath: payLoad.location,
			userId: req.session.userid,
			longitude: location[0],
			latitude: location[1],
			description,
		})
			.then(async photo => {
				const data = await photo.get({ plain: true });
				res.status(201).send(data);
			})
			.catch(err => res.status(500).send(err));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});
module.exports = router;

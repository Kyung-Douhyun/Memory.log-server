const router = require('express').Router();
const { User } = require('../models');
const { userController } = require('../controllers/');

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
			cb(
				null,
				req.session.username + '_' + req.session.userid + '_' + 'profile' + '_' + file.originalname,
			);
		},
	}),
});

router.post('/signup', userController.signUp.post); // 회원가입
router.post('/signin', userController.signIn.post); // 로그인
router.post('/signout', userController.signOut.post); // 로구아웃
router.post('/status', userController.statusMessage.post); //유저 상태메세지 변경
router.post('/userinfo', userController.getUserInfo.post); // email 기준 유저 정보
router.post('/logininfo', userController.getLoginUserInfo.post); // userId 기준 유저 정보
router.post('/profile', upload.single('img'), (req, res) => {
	// 유저의 프로필 사진 변경
	// const { userId } = req.session.userid;
	try {
		let payLoad = { url: req.file.location };
		User.update(
			{
				profilepath: payLoad.url,
			},
			{
				where: {
					id: req.session.userid,
				},
			},
		)
			.then(() => User.findOne({ where: { id: req.session.userid } }))
			.then(user => res.status(200).send(user))
			.catch(err => res.send(err));
	} catch (err) {
		console.log(err);
		res.status(500).send('서버 에러');
	}
});
module.exports = router;

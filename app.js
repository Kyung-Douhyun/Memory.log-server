const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
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
			console.log(file);
			cb(null, file.originalname);
		},
	}),
});

const photoRouter = require('./routes/photo');
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use session with secret key
app.use(
	session({
		secret: 'secretKey',
		resave: false,
		saveUninitialized: true,
	}),
);
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).send('OK'));
app.post('/upload', upload.single('img'), (req, res) => {
	try {
		console.log('req.file: ', req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음

		let payLoad = { url: req.file.location };
		res.status(200).send(payLoad);
	} catch (err) {
		console.log(err);
		res.status(500).send('서버 에러');
	}
});

app.use('/photo', photoRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;

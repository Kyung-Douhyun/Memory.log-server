const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const photoRouter = require('./routes/photo');
const userRouter = require('./routes/user');
const followRouter = require('./routes/follow');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: 'secretKey',
		resave: false,
		saveUninitialized: true,
	}),
);
const port = process.env.PORT || 4000;

app.use(
	cors({
		origin: ['http://localhost:8081'],
		methods: ['GET', 'POST'],
		credentials: true,
	}),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).send('OK'));

app.use('/photo', photoRouter);
app.use('/user', userRouter);
app.use('/follow', followRouter);

app.listen(port, () => console.log(`Memory.log Server app listening at http://localhost:${port}`));

module.exports = app;

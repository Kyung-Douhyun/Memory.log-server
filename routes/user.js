const router = require('express').Router();
const { userController } = require('../controllers/')

router.post('/signup', userController.signup.post);
router.post('/signin', userController.signin.post);

module.exports = router;
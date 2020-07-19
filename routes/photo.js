const router = require('express').Router();
const { photoController } = require('../controllers/')

router.post('/photo', photoController.signup.post);


module.exports = router;
const router = require('express').Router();
const { photoController } = require('../controllers/');

router.post('/photo', photoController.photo.post);

module.exports = router;

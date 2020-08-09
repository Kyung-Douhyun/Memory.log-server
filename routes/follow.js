const router = require('express').Router();
const { followController } = require('../controllers/');

router.post('/friend', followController.requestFriendList.post); // 친구 목록 요청
router.post('/rfollow', followController.requestFollow.post); // 친구 요청
router.post('/ufollow', followController.requestUnFollow.post); // 친구 요청 취소

module.exports = router;

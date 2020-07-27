const router = require('express').Router();
const { followController } = require('../controllers/');

router.post('/friend', followController.requestFriendList.post); // 친구 목록 요청
router.post('/rFollow', followController.requestFollow.post); // 친구 요청
router.post('/aFollow', followController.acceptFollow.post); // 친구 요청 수락
router.post('/crFollow', followController.cancelRequestFollow.post); // 친구 요청 취소

module.exports = router;

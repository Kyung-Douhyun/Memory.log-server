const { User } = require('../../models/');

module.exports = {
	post: (req, res) => {
		// TODO: 유저가 로그인을 했을 떄, 로그인 정보를 DB에서 체크해주는 부분
		// 사용자가 로그인할 때 적어야 할 정보는 email, password -> 요청(req)의 body 부분에 담길 내용
		let { email, password } = req.body;

		User.findOne({
			where: { email, password }, // email과 password 둘다 일치하는지 확인함
		}).then(data => {
			// 사용자가 적은 그 email이 data
			if (!data) {
				res.status(404).send('Invalid user'); // 그런 회원정보가 없다면 404 에러 날려줌
			} else {
				res.status(200).send('Successful!');
			}
		});
	},
};

const { User } = require('../../models'); // model쪽에 있는 users 테이블을 받아오는 부분

module.exports = {
	post: (req, res) => {
		// TODO: 유저가 회원가입을 했을 떄, 회원정보를 DB에 담아주는 부분
		// 사용자가 회원가입할 때 적어야 할 정보는 name, email, password -> 요청(req)의 body 부분에 담길 내용
		const { username, email, password } = req.body;

		User.findOrCreate({
			where: {
				email,
			}, // 이메일이 중복되는지만 확인함
			defaults: {
				username,
				password,
			},
		})
			.then(([user, created]) => {
				if (!created) {
					res.status(409).send('Existing user'); // 동일한 email이 존재하면 conflict code 409를 보내줌
				}
				const data = user.get({ plain: true });
				res.status(200).json(data);
			})
			.catch(err => res.send(err));
	},
};

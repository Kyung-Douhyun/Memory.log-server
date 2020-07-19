const { User } = require('../../models/user') // model쪽에 있는 users 테이블을 받아오는 부분

module.exports = {
    post: (req, res) => {
        // TODO: 유저가 회원가입을 했을 떄, 회원정보를 DB에 담아주는 부분
        // 사용자가 회원가입할 때 적어야 할 정보는 name, email, password -> 요청(req)의 body 부분에 담길 내용
        let { name, email, password } = req.body

        User.findOne({
            where: { email } // 이메일이 중복되는지만 확인함
        })
            .then((data) => { // 사용자가 적은 그 email이 data
                if (data) {
                    res.status(409).send('Existing user') // 동일한 email이 존재하면 conflict code 409를 보내줌
                }
                else {
                    User.create({ name, email, password }) // email이 중복이 아니라면 사용자가 적은 회원정보로 회원가입을 시켜주기 위해 User DB에 해당 정보를 추가해줌
                        .then((result) => { // 사용자가 적은 회원정보가 result
                            res.status(200).send(result)
                        })
                }
            })
    }
}
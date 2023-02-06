const User = require("../model").User
const UserService = require("../service/UserService")
const AuthService = require("../service/AuthService")

module.exports.registerUser = async (req, res) => {

    try {

        if (req.body.email == undefined || req.body.password == undefined) {
            res.status(400)
            res.send({ message: "Missing body params" })
            return
        }
        else if (await User.findOne({ where: { email: req.body.email } })) {

            res.status(400)
            res.send({ message: "Existing entered email" })
            return
        }

        const user = await User.create(req.body)
        res.setHeader('Location', '/users/' + user.id);
        res.status(201).send({})

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.loginController = async (req, res) => {
    try {

        res.setHeader('content-type', 'application/json');
        if (req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
            res.status(400)
            res.send({ message: "Missing body params" })
            return
        }

        const email = req.body.email;
        const password = req.body.password;
        const user = await UserService.getUserByEmailAndPassword(email, password);

        if (user === null) {
            res.status(401)
            res.send({ message: "Wrong email/password" })
            res.end()
            return
        }

        const token = AuthService.generateJWTtoUserId(user.id);
        const isAdmin = user.administrador;
        res.status(200);
        res.send({
            id: user.id,
            username: user.name,
            isAdmin,
            token: token
        });
        res.end()

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}
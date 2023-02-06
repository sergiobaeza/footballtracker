const User = require('../model/index').User
const AuthService = require('../service/AuthService')
const UserService = require('../service/UserService')
const Competition = require('../model/index').Competition

module.exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserDataById(userId);
        if (user === null) {
            res.status(404);
            res.send({ message: "Resource not found" });
        }
        else {
            res.status(200);
            res.send(user);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.getUserByToken = async (req, res) => {
    try {
        const userToken = req.body.token;
        const id = await AuthService.getUserIdByJWT(userToken);
        const user = await UserService.getUserDataById(id)
        if (user === null) {
            res.status(404);
            res.send({ message: "Resource not found" });
        }
        else {
            res.status(200);
            res.send(user);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}


module.exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserById(userId);
        if (user === null) {
            res.status(404);
            res.send({ message: "Resource not found" });
        }
        else {
            if (req.body === undefined) {
                res.status(400)
                res.send({ message: "Missing body params" })
                return
            }
            let needsToUpdate = false
            const data = {}
            if (req.body.name !== undefined) { needsToUpdate = true; data.name = req.body.name; }
            if (req.body.email !== undefined) { needsToUpdate = true; data.email = req.body.email; }
            if (req.body.password !== undefined) { needsToUpdate = true; data.password = req.body.password; }
            if (req.body.age !== undefined) { needsToUpdate = true; data.age = req.body.age; }

            if (needsToUpdate) {
                console.log(data);
                await UserService.updateUser(user, data);
            }
            res.setHeader('Location', '/users/' + user.id);
            res.status(204)
            res.send()
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

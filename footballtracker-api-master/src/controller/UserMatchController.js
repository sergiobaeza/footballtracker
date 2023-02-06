const User = require('../model/index').User
const AuthService = require('../service/AuthService')
const UserService = require('../service/UserService')
const Match = require('../model/index').Match

module.exports.userFollowMatch = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserById(userId);

        if (req.body == undefined || req.body.matchId == undefined) {
            res.status(400)
            res.send({ message: "Missing body params" })
            return
        }

        const match = await Match.findByPk(req.body.matchId);
        if (match === null || user === null) {
            res.status(404)
            res.send({ message: "Resource not found" })
            return
        }

        await UserService.addMatchToUser(user, match);
        res.setHeader('Location', '/users/' + user.id + "/matches");
        res.status(204)
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.userUnFollowMatch = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserById(userId);

        if (req.body == undefined || req.body.matchId == undefined) {
            res.status(400)
            res.send({ message: "Missing body params" })
            return
        }

        const match = await Match.findByPk(req.body.matchId);
        if (match === null || user === null) {
            res.status(404)
            res.send({ message: "Resource not found" })
            return
        }

        await UserService.removeMatchFromUser(user, match);
        res.setHeader('Location', '/users/' + user.id + "/matches");
        res.status(204)
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.userGetMatches = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserById(userId);

        if (user === null) {
            res.status(404)
            res.send({ message: "Resource not found" })
            return
        }

        const matches = await UserService.getMatchesFromUser(user);

        res.status(200);
        res.send(matches);
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}
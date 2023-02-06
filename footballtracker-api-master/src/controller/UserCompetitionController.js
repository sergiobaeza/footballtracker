const User = require('../model/index').User
const AuthService = require('../service/AuthService')
const UserService = require('../service/UserService')
const Competition = require('../model/index').Competition

module.exports.userFollowCompetition = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserById(userId);

        if (req.body == undefined || req.body.competitionId == undefined) {
            res.status(400)
            res.send({ message: "Missing body params" })
            return
        }

        const competition = await Competition.findByPk(req.body.competitionId);
        if (competition === null || user === null) {
            res.status(404)
            res.send({ message: "Resource not found" })
            return
        }

        await UserService.addCompetitionToUser(user, competition);
        res.setHeader('Location', '/users/' + user.id + "/competitions");
        res.status(204)
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.userUnFollowCompetition = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserById(userId);

        if (req.body == undefined || req.body.competitionId == undefined) {
            res.status(400)
            res.send({ message: "Missing body params" })
            return
        }

        const competition = await Competition.findByPk(req.body.competitionId);
        if (competition === null || user === null) {
            res.status(404)
            res.send({ message: "Resource not found" })
            return
        }

        await UserService.removeCompetitionFromUser(user, competition);
        res.setHeader('Location', '/users/' + user.id + "/competitions");
        res.status(204)
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.userGetCompetitions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUserById(userId);

        if (user === null) {
            res.status(404)
            res.send({ message: "Resource not found" })
            return
        }

        const competitions = await UserService.getCompetitionsFromUser(user);

        res.status(200);
        res.send(competitions);
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}
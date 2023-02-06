const Team = require("../model").Team
const Player = require("../model").Player

module.exports.listPlayersInTeam = async (req, res) => {

    try {
        team = await Team.findByPk(req.params.id);

        if (team === null) {
            res.status(404).send({ message: 'Team not found.' });

        }
        else {
            players = await Player.findAll({
                where: { teamId: req.params.id }
            });
            res.status(200).send(players);
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.teamInfo = async (req, res) => {

    try {

        team = await Team.findByPk(req.params.id);

        if (team == undefined) {
            res.status(404).send({ message: 'Team not found.' });

        } else {
            res.status(200).send(team);
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}
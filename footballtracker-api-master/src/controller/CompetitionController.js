const Competition = require("../model").Competition
const Match = require("../model").Match
const Team = require('../model/index').Team;

module.exports.listCompetitions = async (req, res) => {

    try {

        competitions = await Competition.findAll();
        res.status(200).send(competitions);
        return

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.listMatchesInCompetition = async (req, res) => {

    try {

        if (await Competition.findOne({ where: { id: req.params.id } })) {
            matches = await Match.findAll({
                include: [Competition,
                    { model: Team, as: 'awayTeam' },
                    { model: Team, as: 'localTeam' }],
                where: { competitionId: req.params.id }
            });
            res.status(200).send(matches);
            return
        }
        else {
            res.status(404).send({ message: 'Competition not found' });
            return
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}
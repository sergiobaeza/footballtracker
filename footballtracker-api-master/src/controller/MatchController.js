const Match = require("../model").Match
const MatchService = require('../service/MatchService')

module.exports.listMatches = async (req, res) => {

    try {
        const limit = req.query.limit;
        const offset = req.query.offset;

        const matches = await MatchService.buildOffsetMatchesData(limit, offset);
        res.status(200).send(matches);

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

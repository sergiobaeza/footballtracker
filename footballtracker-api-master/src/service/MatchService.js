const Competition = require('../model/index').Competition;
const Team = require('../model/index').Team;
const Match = require('../model/index').Match
const dotenv = require('dotenv')
const url = process.env.URL

module.exports.getMatchDataById = async (matchId) => {
    return (await Match.findByPk(matchId));
}

module.exports.getAllMatchesData = async () => {
    return (await Match.findAll({
        include: [Competition,
            { model: Team, as: 'awayTeam' },
            { model: Team, as: 'localTeam' }]
    }));
}

module.exports.buildOffsetMatchesData = async (limit, offset) => {

    const results = (await Match.findAll({
        include: [Competition,
            { model: Team, as: 'awayTeam' },
            { model: Team, as: 'localTeam' }],
        limit: limit,
        offset: offset
    }));

    const count = await Match.count();

    const nextOffset = (parseInt(offset) + parseInt(limit))
    const beforeOffset = (parseInt(offset) - parseInt(limit))

    return ({
        offset: offset,
        limit: limit,
        total: count,
        count: Object.keys(results).length,
        url: {
            before: url + '/matches?offset=' + beforeOffset + "&limit=" + limit,
            next: url + '/matches?offset=' + nextOffset + "&limit=" + limit,
        },
        results: results
    })

}
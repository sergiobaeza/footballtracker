const User = require('../model/index').User
const Team = require('../model/index').Team
const Competition = require('../model/index').Competition

module.exports.getUserByEmailAndPassword = async (email, password) => {
    return await User.findOne({ where: { email: email, password: password } })
}

module.exports.getUserById = async (userId) => {
    return await User.findByPk(userId);
}

module.exports.getUserDataById = async (userId) => {
    return (await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: userId }
    })).toJSON();
}

module.exports.updateUser = async (user, body) => {
    user.set(body);
    await user.save()
}

module.exports.addCompetitionToUser = async (user, competition) => {
    await user.addCompetition(competition);
}

module.exports.addMatchToUser = async (user, match) => {
    await user.addMatch(match);
}

module.exports.removeMatchFromUser = async (user, match) => {
    await user.removeMatch(match);
}

module.exports.removeCompetitionFromUser = async (user, competition) => {
    await user.removeCompetition(competition);
}

module.exports.getCompetitionsFromUser = async (user) => {
    return (await user.getCompetitions());
}


module.exports.getMatchesFromUser = async (user) => {
    return (await user.getMatches({
        include: [Competition,
            { model: Team, as: 'awayTeam' },
            { model: Team, as: 'localTeam' }]
    }));
}
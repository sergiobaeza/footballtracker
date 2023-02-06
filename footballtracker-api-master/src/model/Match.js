
module.exports = (sequelize, Sequalize) => {

    const Match = sequelize.define('match', {
        // Model attributes are defined here
        date: {
            type: Sequalize.DATE,
            allowNull: false
        },
        stadiumName: {
            type: Sequalize.STRING,
            allowNull: false
        },
        played: {
            type: Sequalize.BOOLEAN,
            defaultValue: false
        },
        localScore: {
            type: Sequalize.INTEGER
        },
        awayScore: {
            type: Sequalize.INTEGER
        }

    }, {
        timestamps: false
    });

    return Match;
}
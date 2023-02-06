
module.exports = (sequelize, Sequalize) => {

    const Player = sequelize.define('player', {
        // Model attributes are defined here
        name: {
            type: Sequalize.STRING,
            allowNull: false
        },
        gamePosition: {
            type: Sequalize.STRING,
            allowNull: false
        },
        birthDate: {
            type: Sequalize.DATE,
        },
        country: {
            type: Sequalize.STRING
        }

    }, {
        timestamps: false
    });

    return Player;
}
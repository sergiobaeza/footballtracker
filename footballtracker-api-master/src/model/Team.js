
module.exports = (sequelize, Sequalize) => {

    const Team = sequelize.define('team', {
        // Model attributes are defined here
        name: {
            type: Sequalize.STRING,
            allowNull: false,
            unique: true
        },
        stadiumName: {
            type: Sequalize.STRING,
            allowNull: false,
            unique: true
        },
        foundationYear: {
            type: Sequalize.INTEGER,
        },
        country: {
            type: Sequalize.STRING
        },
        city: {
            type: Sequalize.STRING
        }

    }, {
        timestamps: false
    });

    return Team;
}
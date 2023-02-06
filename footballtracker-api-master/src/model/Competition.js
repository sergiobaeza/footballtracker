
module.exports = (sequelize, Sequalize) => {
    const Competition = sequelize.define('competition', {
        // Model attributes are defined here
        name: {
            type: Sequalize.STRING
        },
        country: {
            type: Sequalize.STRING,
        },
        startDate: {
            type: Sequalize.DATE
        },
        endDate: {
            type: Sequalize.DATE
        }

    }, {
        timestamps: false
    });

    return Competition;

}
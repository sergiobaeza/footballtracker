
module.exports = (sequelize, Sequalize) => {
    const Advertisement = sequelize.define('advertisement', {
        // Model attributes are defined here
        name: {
            type: Sequalize.STRING,
            allowNull: false
        },
        description: {
            type: Sequalize.STRING
        },
        brand: {
            type: Sequalize.STRING
        },
        img_src: {
            type: Sequalize.STRING
        }

    }, {
        timestamps: false
    });

    return Advertisement;

}
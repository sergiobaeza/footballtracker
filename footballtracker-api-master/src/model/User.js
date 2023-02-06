
module.exports = (sequelize, Sequalize) => {

    const User = sequelize.define('user', {
        // Model attributes are defined here
        name: {
            type: Sequalize.STRING
        },
        email: {
            type: Sequalize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequalize.STRING,
            allowNull: false
        },
        birthDate: {
            type: Sequalize.DATE
        },
        administrador: {
            type: Sequalize.BOOLEAN,
            defaultValue: false
        }

    }, {
        timestamps: false
    });

    return User;
}
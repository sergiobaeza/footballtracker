const db = require("../src/model/index");

module.exports = () => db.sequelize.sync({ force: true });

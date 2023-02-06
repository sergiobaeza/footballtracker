const db = require("../src/model/index");
const lib = require("./dbScript");

module.exports.addData = async () => {
    db.sequelize.sync({ force: true }).then(
        () => {
            lib.createDefaultDB();
        }
    );
}

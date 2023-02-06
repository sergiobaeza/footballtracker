const { Sequelize } = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_SQLITE_SOURCE,
    logging: false
});

const model = {}
model.sequelize = sequelize
model.Sequelize = Sequelize

sequelize.authenticate();
console.log('Connection has been established successfully.');

// Models

model.User = require('./User')(sequelize, Sequelize);
model.Competition = require('./Competition')(sequelize, Sequelize);
model.Match = require('./Match')(sequelize, Sequelize);
model.Player = require('./Player')(sequelize, Sequelize);
model.Team = require('./Team')(sequelize, Sequelize);
model.Advertisement = require('./Advertisement')(sequelize, Sequelize);


// Realtions
// One player has a team.
model.Team.hasMany(model.Player, { foreignKey: { name: 'teamId', allowNull: false } })
model.Player.belongsTo(model.Team)

// Many to many User and Match.
model.User.belongsToMany(model.Match, { through: 'user_match' });
model.Match.belongsToMany(model.User, { through: 'user_match' });

// Many to many User and Competition.
model.User.belongsToMany(model.Competition, { through: 'user_competition' });
model.Competition.belongsToMany(model.User, { through: 'user_competition' });

// One match has a competition.
model.Competition.hasMany(model.Match, { foreignKey: { name: 'competitionId', allowNull: false } })
model.Match.belongsTo(model.Competition);

// One match has a competition.
model.Match.belongsTo(model.Team, { as: 'localTeam', foreignKey: { allowNull: false, name: 'localTeamId' } });
model.Match.belongsTo(model.Team, { as: 'awayTeam', foreignKey: { allowNull: false, name: 'awayTeamId' } });

model.Team.hasMany(model.Match, { as: 'localMatches', foreignKey: { allowNull: false, name: 'localTeamId' }, onDelete: 'cascade' })
model.Team.hasMany(model.Match, { as: 'awayMatches', foreignKey: { allowNull: false, name: 'awayTeamId' }, onDelete: 'cascade' })

console.log("Models loaded")

module.exports = model;
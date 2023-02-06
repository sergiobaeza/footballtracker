const jwtSessionMiddleware = require('./middleware/JwtSessionMiddleware')
const AuthController = require("./controller/AuthController")
const UserController = require("./controller/UserController")
const UserCompetitionController = require("./controller/UserCompetitionController")
const UserMatchController = require("./controller/UserMatchController")
const resourceOwnerMiddleware = require("./middleware/ResourceOwnerMiddleware")
const CompetitionController = require("./controller/CompetitionController")
const TeamController = require("./controller/TeamController")
const MatchController = require("./controller/MatchController")
const upload = require('./service/UploadService')
const AdvertisementController = require('./controller/AdvertisementController');
const AdminMiddleware = require('./middleware/AdminMiddleware')



module.exports = (app) => {

    // UPLOAD BINARY FILE AND GET ADVERTISEMENTS
    app.post('/advertisements', [jwtSessionMiddleware, AdminMiddleware, upload.single('image')], AdvertisementController.createAdvertisement);
    app.get('/advertisements', AdvertisementController.getAdvertisements);

    // Auth
    app.post('/users/register', AuthController.registerUser);
    app.post('/users/login', AuthController.loginController);

    // Match
    app.get('/matches', MatchController.listMatches);

    // Competition
    app.get('/competitions', CompetitionController.listCompetitions);
    app.get('/competitions/:id/matches', CompetitionController.listMatchesInCompetition)

    // Team
    app.get('/teams/:id/players', TeamController.listPlayersInTeam);
    app.get('/teams/:id', TeamController.teamInfo)


    // USER INFO
    app.get('/users/:userId', [jwtSessionMiddleware, resourceOwnerMiddleware], UserController.getUserById);
    app.post('/users/token',  UserController.getUserByToken);
    app.patch('/users/:userId', [jwtSessionMiddleware, resourceOwnerMiddleware], UserController.updateUserById);

    // FOLLOW COMPETITIONS
    app.post('/users/:userId/competitions', [jwtSessionMiddleware, resourceOwnerMiddleware], UserCompetitionController.userFollowCompetition);
    app.delete('/users/:userId/competitions', [jwtSessionMiddleware, resourceOwnerMiddleware], UserCompetitionController.userUnFollowCompetition);
    app.get('/users/:userId/competitions', jwtSessionMiddleware, UserCompetitionController.userGetCompetitions);

    // FOLLOW MATCHES
    app.post('/users/:userId/matches', [jwtSessionMiddleware, resourceOwnerMiddleware], UserMatchController.userFollowMatch);
    app.delete('/users/:userId/matches', [jwtSessionMiddleware, resourceOwnerMiddleware], UserMatchController.userUnFollowMatch);
    app.get('/users/:userId/matches', jwtSessionMiddleware, UserMatchController.userGetMatches);

};


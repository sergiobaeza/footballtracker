const User = require('../model/index.js').User;
const AuthService = require('../service/AuthService')

module.exports = async (req, res, next) => {
    try {
        const token = AuthService.getTokenFromAuthHeader(req);

        let user = null;
        if (token != undefined && AuthService.isValidToken(token))
            user = await User.findByPk(AuthService.getUserIdByJWT(token));

        // response
        if (user !== null) {
            next();
        } else {
            res.status(403);
            res.send({ message: "You don't have permissions" });
        }
    }
    catch (Error) {
        res.status(403);
        res.send({ message: "Token expired" });
    }
}

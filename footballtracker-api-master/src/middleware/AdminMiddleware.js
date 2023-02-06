// Checks if JWT's user is admin
const User = require('../model/index').User
const AuthService = require('../service/AuthService')

module.exports = async (req, res, next) => {
    const userId = AuthService.getUserIdByRequest(req);
    const userRequest = await User.findByPk(userId);
    if (userRequest.administrador === true) { // admin can go :D
        next()
    }
    else {
        res.status(403)
        res.send({ message: "You don't have permissions" });
    }
}
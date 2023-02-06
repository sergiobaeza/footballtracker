// Checks if the user logged is the current owner of the resource or is admin
const User = require('../model/index').User
const AuthService = require('../service/AuthService')

module.exports = async (req, res, next) => {

    const userId = AuthService.getUserIdByRequest(req);
    const userRequest = await User.findByPk(userId);
    const userParam = req.params.userId
    if (userRequest.administrador === true) { // admin can go :D
        next()
        return
    }

    // console.log("I get from user loged " + userId + " and the owner of resource is " + userParam)

    if (parseInt(userId) === parseInt(userParam)) { // user logged trying to access other user's resource
        next()
    }
    else {
        res.status(403)
        res.send({ message: "You don't have permissions" });
    }
}
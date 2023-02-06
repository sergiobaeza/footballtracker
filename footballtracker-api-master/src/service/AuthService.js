const jwt = require("jwt-simple");
const dotenv = require('dotenv')
const key = process.env.JWT_SECRET


module.exports.generateJWTtoUserId = (userId) => {
    const payload = {
        id: userId,
        exp: (Date.now() / 1000) + 60 * 30
    }

    return jwt.encode(payload, key)

}

module.exports.decodeJWT = (token) => {
    return jwt.decode(token, key)
}

module.exports.isValidToken = (token) => {
    const payload = jwt.decode(token, key)
    return (Date.now() / 1000) < payload.exp
}


module.exports.getUserIdByJWT = (token) => {
    const payload = jwt.decode(token, key)
    return payload.id
}

module.exports.getTokenFromAuthHeader = (req) => {
    var cabecera = req.header("Authorization");
    if (cabecera) {
        var campos = cabecera.split(" ");
        if (campos.length > 1 && cabecera.startsWith("Bearer")) {
            return campos[1];
        }
    }
    return undefined;
}

module.exports.getUserIdByRequest = (req) => {
    try {
        return module.exports.getUserIdByJWT(module.exports.getTokenFromAuthHeader(req));
    }
    catch (Error) {
        return undefined;
    }
}
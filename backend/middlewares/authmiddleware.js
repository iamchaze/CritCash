const { JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken')

const authmiddleware = (req, res, next) => {
    const authToken = req.cookies.authToken;
    if (!authToken) {
        return res.status(200).json({ message: "Unauthorized" });
    } else {
        const decoded = jwt.verify(authToken, JWT_SECRET);
        req.username = decoded.username;
        req.userid = decoded.id;
        req.user = {
            username: decoded.username,
            id: decoded.id
        }
        next();
    }
}

module.exports = authmiddleware;
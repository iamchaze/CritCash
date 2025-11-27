const { JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken')

const authmiddleware = (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
        token = req.cookies.authToken;
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            id: decoded.id,
            username: decoded.username
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


module.exports = authmiddleware;
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer ", "");
        console.log("COOKIE RECEIVED:", req.cookies);
    }

    if (!token) {
        token = req.cookies.authToken;
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            username: decoded.username
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


module.exports = authMiddleware;
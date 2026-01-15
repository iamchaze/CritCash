require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes/mainRouter");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  "https://crit-cash.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.use('/api/v1', mainRouter);



app.get("/", (req, res) => {
    res.send("<h1>Welcome to Paymate</h1>");
})


app.listen(PORT, () => {
    console.log(`Server Running on Port - ${PORT}`);
});




const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
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
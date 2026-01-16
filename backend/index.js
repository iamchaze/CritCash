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
  origin: "https://crit-cash.vercel.app",
  credentials: true,
}));





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1', mainRouter);



app.get("/", (req, res) => {
    res.send("<h1>Welcome to Paymate</h1>");
})


app.listen(PORT, () => {
    console.log(`Server Running on Port - ${PORT}`);
});


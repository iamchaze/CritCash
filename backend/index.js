require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/mainRouter");



const PORT = process.env.PORT || 5000;
const app = express();
app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://crit-cash.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.originalUrl);
  next();
});


app.use("/api/v1", mainRouter);


app.get("/", (req, res) => {
  res.send("<h1>Welcome to Paymate</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Running on Port - ${PORT}`);
});

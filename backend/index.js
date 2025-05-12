const express = require("express");
const mainRouter = require("./routes/mainRouter");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1', mainRouter);



app.get("/", (req, res) => {
    res.send("<h1>Welcome to Paymate</h1>");
})


app.listen(port = 5000, () => {
    console.log(`http://localhost:${port}`);
});


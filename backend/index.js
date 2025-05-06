const express = require("express");
const mainRouter = require("./routes/mainRouter");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', mainRouter);



app.get("/", (req, res) => {
    res.send("<h1>Welcome to Paymate</h1>");
})


app.listen(port = 5000, () => {
    console.log(`http://localhost:${port}`);
});

    
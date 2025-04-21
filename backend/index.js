const express = require("express");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Paymate</h1>");
})


app.listen(5000, () => {
    console.log("http://localhost:5000");
});

    
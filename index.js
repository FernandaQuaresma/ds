const express = require("express");

const app = express();

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/login-aluno/:email/:senha", function (req, res) {
    res.send(req.params);
})

app.get("/login-professor/:email/:materia/:senha", function (req, res) {
    res.send(req.params);
})

app.get("/login-pais/:email/:senha", function (req, res) {
    res.send(req.params);
})

app.listen(3031, function () {
    console.log("Server is running on port 3031");
});
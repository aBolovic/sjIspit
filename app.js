const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "user.html"));
});


app.get("/books", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "book.html"));
});

app.listen({ port: 9000 }, () => {
    console.log("Pokrenut server na portu 9000");
});

let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let reservations = [];
let waitList = [];

let app = express();
let PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.post("/reserve", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    if (reservations.length >= 5) {
        waitList.push(req.body);
        // res.send(alert("Sorry you are on the waitlist!"));
    } else {
        reservations.push(req.body);
        // res.send(alert("You are offically booked!"));
    }
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "restaurant.html"));
});
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function (req, res) {
    res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
    res.json(waitList);
});














app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
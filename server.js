var express = require("express");
var mongoose = require("mongoose");
var path = require("path");


var PORT = 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get('/', function (req, res) {
  res.sendFile(path.join("./public/index.html"))
})

app.listen(process.env.PORT || PORT, function () {
  console.log("App running on port " + PORT + "!");
});

require('./app/routes/api-routes')(app);
const express = require("express");
const app = express();
const port = 9000;
const mongoose = require("mongoose"); //NoSQL database
var bodyParser = require('body-parser');
var route = require("./routes/form.js");
//connection of server on port no.9000
app.listen( port, function(){
    console.log("Connected to port " + port );
});

//connection of NoSQL database
mongoose.connect('mongodb://127.0.0.1/dashboard', { useUnifiedTopology: true, useNewUrlParser: true});
// mongoose.set('useUnifiedTopology', true);

var db = mongoose.connection;
db.once('open', function() {
  console.log("database connected");
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use("/route/form", route);



module.exports = app;
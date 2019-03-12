//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
const port = 3005;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//model connection
//mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});
//model schema

//////////////////// routes ////////////////////
app.get('/', function(req, res){
  res.render("home");
});

app.get('/register', function(req, res){
  res.render("register");
});

app.get('/login', function(req, res){
  res.render("login");
});
//////////// server listen to /////////////////
app.listen(port, function(){
  console.log(`server started and is listening on ${port}`);
});

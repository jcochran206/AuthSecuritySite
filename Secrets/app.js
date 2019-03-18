//jshint esversion:6
require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const saltRounds = 2;



const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//model connection
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
//model schema
const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});



// user model
const User = new mongoose.model("User", userSchema);

//////////////////// routes ////////////////////
app.get('/', function(req, res){
  res.render("home");
});

app.route("/register")
.get( function(req, res){
  res.render("register");
})
.post(function(req, res){

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.render("secrets");
      }
    });
  });
});

app.route("/login")
.get(function(req, res){
  res.render("login");
})
.post(function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        bcrypt.compare(password, foundUser.password, function(err, result) {
            if(result === true ){
              res.render('secrets');
            }
        });
      }
    }
  });
});
//////////// server listen to /////////////////
app.listen(port, function(){
  console.log(`server started and is listening on ${port}`);
});

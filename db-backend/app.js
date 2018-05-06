const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// const server = require("http").Server(app);
// const io = require("socket.io")(server);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Knex = require("knex");
const knexConfig = require("./knexfile.js");
const objection = require("objection");
const Model = objection.Model;
const knex = Knex(knexConfig.development);
var cors = require('cors')
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// give the knex connection to objection.js
Model.knex(knex);
// CORS-enabled for all origins!
app.use(cors())

// convenience object that contains all the models and easy access to knex
const db = {
    "Knex": knex,
    "User": require("./models/User.js")
}

app.post("/signup", function(req, res) {
//    select * from users where username = 'some_user_name';
    let response = {};

    const email = req.body.email;
    // const password = req.body.password;

    db.User.query().select().where('email', email)
        .then(foundUsers => {
            if (foundUsers.length > 0) {
                response.message = "user already exists by that name";
                response.status = 200;
                res.send(response)
            } else {
                // we are ready to sign up a user .. remember to do proper validation here

                if(req.body.firstName === ""){
                    response.message = "Wrong input for First name !!!";
                    response.status = 400;
                    res.send(response)
                }else if(req.body.lastName === ""){
                    response.message = "Wrong input for Last name !!!";
                    response.status = 400;
                    res.send(response)
                }else if(req.body.username === ""){
                    response.message = "Wrong input for Username !!!";
                    response.status = 400;
                    res.send(response)
                }else if(req.body.email === ""){
                    response.message = "Wrong input for Email !!!";
                    response.status = 400;
                    res.send(response)
                }else if(req.body.password === ""){
                    response.message = "Wrong input for Password !!!";
                    response.status = 400;
                    res.send(response)
                }else{
                    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                        db.User.query().insert({
                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName,
                            "username": req.body.username,
                            "email": email,
                            "password": hash,
                            
                        }).then(persistedUser => {
                                response.status = 200;
                                response.message = "user signed up";
                                res.send(response);
                            }).catch(err => {
                                response.status = 500;
                                response.message = "error saving the user to the database";
                                res.send(response);                        
                            });
                    });
                }
            }
        }).catch(err => {
            response.status = 500;
            response.message = "error connecting or quering the database";
            res.send(response);
        });

});

app.post("/login", function(req, res) {
    let response = {};

    db.User.query().select().where({
        "email": req.body.email
    }).then(foundUsers => {
        if (foundUsers.length === 0) {
            response.status = 403; // forbidden
            response.message = "no such user found";
            res.send(response);
        } else {

            bcrypt.compare(req.body.password, foundUsers[0].password).then(function(passValid) {
                if (passValid) {
                    response.status = 200;
                    response.message = foundUsers[0].username;
                    res.send(response);
                } else {
                    response.status = 403; // forbidden
                    response.message = "no such user found";
                    res.send(response);
                }
            });
        }
    }).catch(err => {
        response.status = 500;
        response.message = "error connecting or quering the database";
        res.send(response);
    });
});

app.get("/get-users", function(req, res) {
    let response = {};

    db.User.query().select()
    .then(foundUsers => {
        // response.status = 200;
        // response.message = "All Users";

        // foundUsers.forEach(element => {
        //     delete element.id;
        // });

        response.users = foundUsers;
        res.send(foundUsers);
    }).catch(err => {
        response.status = 500;
        response.message = "error connecting or quering the database";
        response.users = foundUsers;
        res.send(response);
    });
});

let server = app.listen("3001", function(err) {
    if (err) {
        console.log("Error starting the server", err);
    }
    console.log("Starting the server on port", server.address().port);
});

module.exports = app;
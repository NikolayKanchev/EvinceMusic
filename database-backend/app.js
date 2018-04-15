let express = require('express');
let app = express();
const bodyParser = require('body-parser');

 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
 app.use(bodyParser.json()); 

const bcrypt = require('bcrypt');
const saltRounds = 10;

const objection = require("objection");
const Model = objection.Model;

const Knex = require("knex");
const knexConfig = require("./knexfile.js");
const knex = Knex(knexConfig.development);

Model.knex(knex); // give the knex connection to objection.js

// convenience object that contains all the models and easy access to knex
const db = {
    "Knex": knex,
    "User": require("./models/User.js")
}

app.post("/register", function(req, res) {
    //    select * from users where username = 'some_user_name';
    let response = {};

    const email = req.body.email;

    db.User.query().select().where({'email': email})
        .then(foundUsers => {
            if (foundUsers.length > 0) {
                response.message = "user already exists by that name";
                response.status = 200;
                res.send(response)                
                
            } else {
                // we are ready to sign up a user .. remember to do proper validation here

                bcrypt.hash(req.body.password, saltRounds).then(function(hash) {

                    db.User.query().insert({
                        "firstName": req.body.firstName,
                        "lastName": request.body.lastName,
                        "username": req.body.username,
                        "email": req.body.email,
                        "password": hash

                    })
                    .then (persistedUser => {
                        response.status = 200;
                        response.message = "user signed up";
                        res.send(response);

                    }).catch(err => {
                        assert.isNotOk(error,'Promise error');
                        response.status = 500;
                        response.message = "error saving the user to the database";
                        res.send(response);                                                
                    });
                });
            }
        }).catch(err => {
            response.status = 500;
            response.message = "error connecting or quering the database";
            res.send(response);
        }
    );
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
                    response.username = foundUsers[0].username;
                    response.status = 200;
                    res.send(response);
                } else {
                    response.status = 403; // forbidden
                    response.message = "no such user found";
                    res.send(response);
                }
            });
        }
    }).catch(err => {
        response = 500;
        response.message = "error connecting or quering the database";
        res.send(response);
    });
});


var server = app.listen('4000',function(err){
    if(err){
        console.log('Error:', err);        
    }else{
        console.log('The server is running on port:', server.address().port);       
    }
});
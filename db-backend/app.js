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
const cors = require('cors');
const nodemailer = require('nodemailer');
const sendMail = require("./email_config/emailAndPass");
  
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
    "User": require("./models/User.js"),
    "Project": require("./models/Project.js")
}

//region *** signup ***
app.post("/signup", function(req, res) {
//    select * from users where username = 'some_user_name';
    let response = {};

    const email = req.body.email;
    // const password = req.body.password;-

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
//endregion

//region *** login ***
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
                    response.userId = foundUsers[0].id;
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
//endregion

//region *** reset-pass ***
app.post("/reset-pass", function(req, res) {
    let response = {};
    let email = req.body.email;
    let newPass = randomPasswordGenerator(8);

    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            //the e-mail and the password comes from email_config/emailAndPass.js
            user: sendMail.getEmail(),
            pass: sendMail.getPass()
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    
    const mailOptions = {
        from: sendMail.getEmail(), // sender e-mail
        to: email, // receiver e-mail
        subject: 'Reset Password', // Subject line
        html: "<p>Your new Password is: " + newPass + "</p>"// message
    };

    db.User.query().select().where({
        "email": email
    }).then(foundUsers => {
        if (foundUsers.length === 0) {
            response.status = 403; // forbidden
            response.message = "There is no user with e-mail: " + email;
            res.send(response);
        } else {
            
            bcrypt.hash(newPass, saltRounds).then(function(hashedPass) {

                db.User.query().where('id', foundUsers[0].id).update({
                    "password": hashedPass
                })
                .then(
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err){
                        response.status = 400;
                        response.message = "There was a problem sending the e-mail. \n Please check your e-mail and try again !";
                        res.send(response);
                    }else{
                        response.status = 200;
                        response.message = "Soon you will receive an e-mail !";
                        res.send(response);
                    }                      
                 }),

                )
            });            
        }
    }).catch(err => {
        response.status = 500;
        response.message = "Error connecting or quering the database";
        res.send(response);
    });
});

function randomPasswordGenerator(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
//endregion

//region *** get-users, get-user ***
app.get("/get-users", function(req, res) {
    let response = {};

    db.User.query().select()
    .then(foundUsers => {
        response.users = foundUsers;
        res.send(foundUsers);
    }).catch(err => {
        response.status = 500;
        response.message = "error connecting or quering the database";
        response.users = foundUsers;
        res.send(response);
    });
});

app.post("/get-user", function(req, res) {
    loggedUserId = req.body.id;
    let response = {};

    db.User.query().select().where({
        "id": loggedUserId
    }).then(foundUsers => {
        if(foundUsers.length === 0){
            response.status = 403;
            response.user = foundUsers[0];
            res.send(foundUsers);
        }else{
            response.status = 200;
            response.user = foundUsers[0];
            res.send(foundUsers);
        }
        
    }).catch(err => {
        response.status = 500;
        response.user = foundUsers[0];
        res.send(response);
    });
});

app.post("/update-user", function(req, res) {
    userId = req.body.userId;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    let response = {};
    
    if(password === ""){
        db.User.query().where('id', userId).update({
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "email": email,
        })
        .then(
            response.status = 200,
            response.message = "User details was updated !!!",
            res.send(response)
        ).catch(err => {
            response.status = 500;
            response.message = "Error connecting or quering the database";
            res.send(response);
        });
    }else{
        bcrypt.hash(password, saltRounds).then(function(hashedPass) {

            db.User.query().where('id', userId).update({
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "email": email,
                "password": hashedPass
            })
            .then(
                response.status = 200,
                response.message = "User details saved !!!",
                res.send(response)
            ).catch(err => {
                response.status = 500;
                response.message = "Error connecting or quering the database";
                res.send(response);
            });
        })
    }
});
// endregion

// region *** CRUD Project ***

        //region *** get-projects ***
app.get("/get-projects", function(req, res) {
    let response = {};

    db.Project.query().select()
    .then(foundProjects => {
        response.projects = foundProjects;
        res.send(foundProjects);
    }).catch(err => {
        response.status = 500;
        response.message = "error connecting or quering the database";
        response.projects = foundProjects;
        res.send(response);
    });
});
        //endregion

        //region *** update-project ***
app.post("/update-project", function(req, res) {
    let response = {};    
   
    db.Project.query().select().where({
        "id": req.body.id
    }).then(foundProjects => {
        if (foundProjects.length === 0) {
            response.status = 403;
            response.message = "There is no such project";
            res.send(response);
        } else {
            db.Project.query().where('id', req.body.id).update({
                "pick": req.body.pick,
                "title": req.body.title,
                "date": req.body.date,
                "text": req.body.text, 
            })
            .then(
                response.status = 200,
                response.message = "The project was updated !",
                res.send(response)
            )
        };            
    }).catch(err => {
        response.status = 500;
        response.message = "Error connecting or quering the database";
        res.send(response);
    });
});
        // endregion

        //region *** delete-project ***
app.post("/delete-project", function(req, res) {
    let response = {};       

    db.Project.query().select().where('id', req.body.id)
        .then(foundProjects => {
            if (foundProjects.length === 0) {
                response.message = "The project doesn't exist !";
                response.status = 400;
                res.send(response)
            } else {    
                db.Project.query().delete().where('id', req.body.id)
                .then(persistedUser => {
                    response.status = 200;
                    response.message = "The Project was deleted";
                    res.send(response);
                }).catch(err => {
                    response.status = 500;
                    response.message = "Error deleting the project";
                    res.send(response);                        
                });
            }
        }).catch(err => {
            response.status = 500;
            response.message = "error connecting or quering the database";
            res.send(response);
        });
    }
)

        //endregion

        //region *** add-project ***
app.post("/add-project", function(req, res) {
    let response = {};
    
    db.Project.query().insert({
        "pick": req.body.pick,
        "title": req.body.title,
        "date": req.body.date,
        "text": req.body.text,                        
    }).then(persistedUser => {
        response.status = 200;
        response.message = "A new Project was saved in DB";
        res.send(response);
    }).catch(err => {
        response.status = 500;
        response.message = "Error saving the project to the database";
        res.send(response);                        
    });
})
        //endregion

// endregion

let server = app.listen("3001", function(err) {
    if (err) {
        console.log("Error starting the server", err);
    }
    console.log("Starting the server on port", server.address().port);
});

module.exports = app;
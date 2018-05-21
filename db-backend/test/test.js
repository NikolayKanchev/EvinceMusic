const chai = require('chai');
const chaiHttp = require('chai-http');
const main = require("../app.js");
const should = chai.should();

chai.use(chaiHttp);

describe('Database interaction', function(){

    describe('Users', function(){

        // it('should register a new user on /signup POST', function(done){
        //     let testUser = {
        //         "firstName": "TestUser",
        //         "lastName": "TestUser",
        //         "username": "TT",
        //         "email": "test@yahoo.com",
        //         "password": "testPass"

        //     }

        //     chai.request(main)
        //     .post('/signup')
        //     .send(testUser)
        //     .end(function(err, res){
        //     res.should.have.status(200);
        //     res.should.be.json;
        //     res.body.message.should.equal('The user was registered successfully !');
        //     done();
        //     });
        // });

        it('should login a user on /login POST', function(done){
            let testUser = {
                "email": "admin@yahoo.com",
                "password": "1234"
            }

            chai.request(main)
            .post('/login')
            .send(testUser)
            .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property("userId");
            res.body.message.should.equal('ADMIN');
            res.body.userId.should.equal(6);
            res.should.be.json;
            done();
            });
        });

        it('should reset password and send an e-mail on /reset-pass POST', function(done){
            let testEmail = {
                "email": "marto@yahoo.com"
            }

            chai.request(main)
            .post('/reset-pass')
            .send(testEmail)
            .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.message.should.equal('Soon you will receive an e-mail !');
            res.should.be.json;
            done();
            });
        });
    });

    describe('Projects', function(){

        it('should register a new project on /add-project POST', function(done){
            let testProject = {
                "pick": "test.png",
                "title": "test title",
                "date": "test date",
                "text": "ooooooooooooooo"
            }

            chai.request(main)
            .post('/add-project')
            .send(testProject)
            .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.should.have.property('projects');
            res.body.projects.should.be.a('array');
            res.body.message.should.equal('The project was saved !');
            done();
            });
        });

        it('should delete a project on /delete-project POST', function(done){
            projectId = {"id": "292"}

            chai.request(main)
            .post('/delete-project')
            .send(projectId)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.should.have.property('projects');
                res.body.projects.should.be.a('array');
                res.body.message.should.equal('The Project was deleted');
            done();
            });
        });


    });



    

    // it("should get list of all messages on /get-messages GET", function(done){
    //     chai.request(main)
    //     .get('/get-messages')
    //     .end(function(err, res){
    //         res.should.have.status(200);
    //         res.body.should.be.a('object');
    //         res.body.messages.should.be.a('array');
    //         done();
    //     });
    // });

    // it('should update a user status on /updateActive POST', function(done){
    //     let active = true;
    //     let data = {
    //         'userId': 5, 'isActive': active
    //     }

    //     chai.request(main)
    //     .post('/updateActive')
    //     .send(data)
    //     .end(function(err, res){
    //     res.should.have.status(200);
    //     res.should.be.json;
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('message');
    //     res.body.message.should.equal('User status updated successfully !');
    //     done();
    //     });
    // });

    
    // it('should sign in a user on /sign-in POST', function(done){
    //     let testUser = {
    //         "email": "nikolay.kanchev@yahoo.com",
    //         "password": "1234"
    //     }

    //     chai.request(main)
    //     .post('/sign-in')
    //     .send(testUser)
    //     .end(function(err, res){
    //     res.should.have.status(200);
    //     res.should.be.json;
    //     res.body.should.be.a('object');
    //     res.body.should.have.property('username');
    //     res.body.should.have.property('userId');
    //     res.body.username.should.equal("NK");
    //     done();
    //     });
    // });
});


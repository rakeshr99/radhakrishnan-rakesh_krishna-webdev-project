var app = require("../express");
var userModel = require(".//models/user/user.model.server");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

//http handlers
app.get("/api/users",getAllUsers );
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", unregister);
app.get("/api/owner", getOwnersList);
app.post("/api/login", passport.authenticate('local'), login);
app.post("/api/logout", logout);
app.get("/api/checkLogin",checkLogin);
app.post("/api/owner/followMe", followMe);

function followMe(req, res){
    var user = req.user;
    var body = req.body;
    var userId = body.userId;
    var ownerName = body.ownerName;
    var owner = {};

    userModel
        .updateFollowing(userId, ownerName)
        .then(function (response){
            userModel
                .updateFollowed(ownerName, user.username)
                .then(function (response){
                    res.sendStatus(200);
                })
            //res.sendStatus(200);
        })
}
function logout(req, res){
    req.logout();
    res.sendStatus(200);
}

function checkLogin(req, res){
    res.send(req.isAuthenticated() ? req.user : '0');
}

function localStrategy(username, password, done){
    userModel
        .findUserByCredentials(username, password)
        .then(function (user){
                if (!user)
                {
                    return done(null, false, {
                        error : 'Incorrect username or password.'
                    });
                }
                return done(null, user);
            },
            function(err) {
                if (err)
                {
                    return done(err);
                }
            });

/*            else{
                res.send("0");
            }*/
}

function login(req, res){
    var user = req.user;
    res.json(user);
}

function getOwnersList(req, res){
    userModel.getOwnersList()
        .then(function (owners){
            res.json(owners);
        })
}

function unregister(req, res){
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status){
            if(status){
                res.send(status);
            }else{
                res.send(404);
            }
        });
}

function updateUser(req, res){
    var userId = req.params.userId;
    var user  = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status){
            if(status){
                res.send(status);
            }else{
                res.send(404);
            }
        });
}

function registerUser(req, res){
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user){
            req.login(user, function (status){
                res.json(user);
            })
        },
        function (err){
            res.send(err);
        });
}

function findUser(req, res){
    var body = req.body;
    var username = body.username;
    var password = body.password;

    if(username && password) {

        userModel
            .findUserByCredentials(username, password)
            .then(function (user){
                if(user){
                    res.json(user);
                    return;
                }else{
                    res.send("0");
                }
            });
    }else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user){
                if(user) {
                    res.json(user);
                    return;
                }else {
                    res.send("0");
                }
            });
    }else{
        res.send("0");
    }
    }

function getAllUsers(req, res){
    res.send(users);
}

function getUserById(req, res){
    var userId = req.params.userId;

    userModel.findUserById(userId)
        .then(function (user){
            res.json(user);
        })
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
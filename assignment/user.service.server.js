var app = require("../express");
var userModel = require("../assignment/models/user/user.model.server");
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

/*    var user = users.find(function (user){
        if(user._id === userId){
            var index = users.indexOf(user);
            users.splice(index, 1);
            res.send("true");
        }
    });*/
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

/*    for(var u in users){
        if(users[u]._id === userId){
            users[u] = user;
            res.send(users[u]);
            return;
        }
    }res.send(404);*/
}

function registerUser(req, res){
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user){
            res.json(user);
        },
        function (err){
            res.send(err);
        });
/*    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);*/
}

function findUser(req, res){
    var username = req.query.username;
    var password = req.query.password;

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
/*        for (u in users) {
            var _user = users[u];
            if (_user.username === username && _user.password === password) {
                res.send(_user);
                return;
            }
        }*/
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
/*        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }*/
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
/*    for(var u in users){
        if(users[u]._id  === req.params.userId){
            res.send(users[u]);
        }
    }*/
}
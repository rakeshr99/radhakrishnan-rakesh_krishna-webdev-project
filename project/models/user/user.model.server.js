var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUser = findAllUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser =updateUser ;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.getOwnersList = getOwnersList;
userModel.updateFollowing = updateFollowing;
userModel.updateFollowed = updateFollowed;

module.exports = userModel;

function updateFollowing(userId, ownerName){
    return userModel.findUserById(userId)
        .then(function (user){
            user.following.push(ownerName);
            user.save();
        })
}

function updateFollowed(ownerName, username){
    return userModel.findUserByUsername(ownerName)
        .then(function (user){
            user.followed.push(username);
            user.save();
        })
}
function getOwnersList(){
    return userModel.find({roles : "OWNER"});
}

function removeWebsite(userId, websiteId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
    })
}

function addWebsite(userId,websiteId){
    return userModel.findUserById(userId)
        .then(function (user){
        user.websites.push(websiteId);
        user.save();
    })
}
function createUser(user){
    return userModel.create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findAllUser(){
    return userModel.find();
}

function findUserByUsername(username){
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password){
    return userModel.findOne({username :username, password: password});
}

function updateUser(userId, user){
    delete user.username;
    delete user.password;
    return userModel.update({_id : userId}, {$set : user});
}

function deleteUser(userId){
    return userModel.remove({_id : userId});
}

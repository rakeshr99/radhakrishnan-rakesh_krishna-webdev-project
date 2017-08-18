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
userModel.addRestaurant = addRestaurant;
userModel.removeRestaurant = removeRestaurant;
userModel.addReview = addReview;
userModel.removeReview = removeReview;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function findUserByGoogleId(googleId){
    return userModel.findOne({'google.id': googleId});
}

function removeReview(userId, reviewId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        })
}

function addReview(userId,reviewId){
    return userModel.findUserById(userId)
        .then(function (user){
            user.reviews.push(reviewId);
            user.save();
        })
}

function removeRestaurant(userId, restaurantId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.restaurants.indexOf(restaurantId);
            user.restaurants.splice(index, 1);
            return user.save();
        })
}

function addRestaurant(userId,restaurantId){
    return userModel.findUserById(userId)
        .then(function (user){
            user.restaurants.push(restaurantId);
            user.save();
        })
}

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
    /*user.roles = ["USER"];*/
    return userModel.create(user);
}

function findUserById(userId){
    return userModel
        .findById(userId)
        .populate("restaurants reviews")
        .exec(function (err, results) {
            // callback
        });
        //.populate("reviews", "total")

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

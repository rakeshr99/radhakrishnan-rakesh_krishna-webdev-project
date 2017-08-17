var mongoose = require("mongoose");
var restaurantSchema = require("../restaurant/restaurant.schema.server");
var restaurantModel = mongoose.model("RestaurantModel", restaurantSchema);
var userModel = require("../user/user.model.server");

restaurantModel.findAllRestaurantsForUser = findAllRestaurantsForUser;
restaurantModel.findRestaurantById = findRestaurantById;
restaurantModel.createRestaurant = createRestaurant;
restaurantModel.updateRestaurant = updateRestaurant;
restaurantModel.deleteRestaurant = deleteRestaurant;
restaurantModel.getAllRestaurants = getAllRestaurants;
restaurantModel.addReview = addReview;
restaurantModel.removeReview = removeReview;

module.exports = restaurantModel;

function removeReview(restaurantId, reviewId){
    return restaurantModel
        .findById(restaurantId)
        .then(function (restaurant){
            var index = restaurant.reviews.indexOf(reviewId);
            restaurant.reviews.splice(index, 1);
            return restaurant.save();
        })
}

function addReview(restaurantId,reviewId){
    return restaurantModel.findById(restaurantId)
        .then(function (restaurant){
            restaurant.reviews.push(reviewId);
            return restaurant.save();
        })
}

function getAllRestaurants(){
    return restaurantModel.find();
}

function findAllRestaurantsForUser(userId){
    return restaurantModel
        .find({_user : userId})
        .populate('user', 'username')
        .exec();
}

function findRestaurantById(restaurantId){
    return restaurantModel
            .findById({_id : restaurantId})
            .populate("reviews", "total");
}

function createRestaurant(userId, restaurant){
    restaurant._user = userId;
    var restauranttmp = null;
    if(restaurant._id == null){
        return restaurantModel
            .create(restaurant)
            .then(function (restaurantDoc){
                restauranttmp = restaurantDoc;
                return userModel.addRestaurant(userId, restaurantDoc._id)
            }, function(error){
                return res.json({error:error.message});
            }).catch(function () {
                console.log("Promise Rejected");
            })
            .then(function (userDoc) {
                return restauranttmp;
            });
    }else{
        return restaurantModel
            .findById({_id : restaurant._id})
            .then(function (response){
                return userModel.addRestaurant(userId, restaurant._id);
            })
    }

}

function updateRestaurant(restaurantId, restaurant){
    return restaurantModel.update({_id : restaurantId}, {$set : restaurant});
}

function deleteRestaurant(userId, restaurantId){
    return restaurantModel
        .remove({_id : restaurantId})
        .then(function (status){
            return userModel.removeRestaurant(userId, restaurantId);
        });
}

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

/*pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;*/

module.exports = restaurantModel;

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
    return restaurantModel.findById({_id : restaurantId})
}

function createRestaurant(userId, restaurant){
    restaurant._user = userId;
    var restauranttmp = null;
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

/*function removeWidget(pageId, widgetId){
    return pageModel
        .findById(pageId)
        .then(function (page){
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}

function addWidget(pageId,widgetId){
    return pageModel.findById(pageId)
        .then(function (page){
            page.widgets.push(widgetId);
            return page.save();
        })
}*/

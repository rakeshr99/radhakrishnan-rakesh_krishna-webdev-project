var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ReviewModel", reviewSchema);
var restaurantModel = require("../restaurant/restaurant.model.server");
var userModel = require("../user/user.model.server");

reviewModel.findAllReviewsForRestaurant = findAllReviewsForRestaurant;
reviewModel.findReviewById = findReviewById;
reviewModel.createReview = createReview;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;
//reviewModel.addWidget = addWidget;
//reviewModel.removeWidget = removeWidget;

module.exports = reviewModel;

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

function findAllReviewsForRestaurant(userId, restaurantId){
    return reviewModel
            .find({_restaurant : restaurantId})
            .populate('restaurant', 'name')
            .find({_user : userId})
            .populate('user', 'username')
            .exec();
}

function findReviewById(reviewId){
    return reviewModel.findById({_id : reviewId});
}

function createReview(userId, restaurantId, review){
    review._restaurant = restaurantId;
    review._user = userId;
    var reviewtmp = null;
    return reviewModel
        .create(review)
        .then(function (reviewDoc){
            reviewtmp = reviewDoc;
            restaurantModel
                .addReview(restaurantId, reviewDoc._id)
                .then(function (response){
                    return userModel
                            .addReview(userId,reviewDoc._id)
                })
        }, function(error){
            return res.json({error:error.message});
        }).catch(function () {
            console.log("Promise Rejected");
        })
        .then(function (restaurantDoc) {
            return reviewtmp;
        });
}

function updateReview(reviewId, review){
    return reviewModel.update({_id : reviewId}, {$set : review});
}

function deleteReview(userId, restaurantId, reviewId){
    return reviewModel
        .remove({_id : reviewId})
        .then(function (status){
            restaurantModel
                .removeReview(restaurantId, reviewId)
                .then(function (response){
                    return userModel
                        .removeReview(userId, reviewId)
                })
        });
}

var mongoose = require("mongoose");
var reviewSchema = require("../review/review.schema.server");
var reviewModel = mongoose.model("ReviewModel", reviewSchema);
var restaurantModel = require("../restaurant/restaurant.model.server");

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

function findAllReviewsForRestaurant(restaurantId){
    return reviewModel
            .find({_restaurant : restaurantId})
            .populate('restaurant', 'name')
            .exec();
}

function findReviewById(reviewId){
    return reviewModel.findById({_id : reviewId});
}

function createReview(restaurantId, review){
    review._restaurant = restaurantId;
    var reviewtmp = null;
    return reviewModel
        .create(review)
        .then(function (reviewDoc){
            reviewtmp = reviewDoc;
            return restaurantModel.addReview(userId, reviewDoc._id)
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

function deleteReview(restaurantId, reviewId){
    return reviewModel
        .remove({_id : reviewId})
        .then(function (status){
            return restaurantModel.removeReview(restaurantId, reviewId);
        });
}

var app = require("../express");
var mongoose = require("mongoose");
const http = require('http');
'use strict';
const yelp = require("../node_modules/yelp-fusion");
var reviewModel = require("../project/models/review/review.model.server");

app.post("/api/new-review", createReview);
app.get("/api/yelp/localSearchReview/:restaurantId/:userId", searchReviewById);
app.get("/api/yelp-review/:restaurantId", getReviewsFromYelp);
app.delete("/api/delete-review", deleteReview);
app.get("/api/search-review/:reviewId", searchReviewByIdForUpdate);

function searchReviewByIdForUpdate(req, res){
    var reviewId = req.params.reviewId;

    reviewModel
        .findReviewById(reviewId)
        .then(function (review){
            res.json(review);
            return;
        });
}

function deleteReview(req, res){
    var userId = req.query.userId;
    var restaurantId = req.query.restaurantId;
    var reviewId = req.query.reviewId;

    return reviewModel
        .deleteReview(userId, restaurantId, reviewId)
        .then(function (status){
            res.json(status);
            return;
        });
}

function getReviewsFromYelp(req, res){
    var restaurantId = req.params.restaurantId;

    var client_id = "IxPjAaoDsjXWxu7uiGZ_Rw";
    var client_secret = "7sOmpAgiqReLloF4GSGTs6VGY1ziJc89T1p3VMsIPnPqrTYTp9LHw8a7vkRZauzg";
    var accessToken = null;
    const token = yelp
        .accessToken(client_id, client_secret)
        .then(function(response) {
            console.log(response.jsonBody.access_token);
            accessToken = response.jsonBody.access_token;
            //res.json(response);
        }, function(error){
            return res.json({error:error.message});
        }).catch(function () {
            console.log("Promise Rejected");
        })
        .then(function (response){
            const client = yelp.client(accessToken);

            client.reviews(restaurantId)
                .then(function (response){
                    //console.log(response.jsonBody.businesses[0]);
                    res.json(response);
                }, function(error){
                    return res.json({error:error.message});
                }).catch(function () {
                console.log("Promise Rejected");
            })
        })


}

function searchReviewById(req, res){
    var restaurantId = req.params.restaurantId;
    var userId = req.params.userId;

    if(mongoose.Types.ObjectId.isValid(restaurantId))
    {
        return reviewModel
            .findAllReviewsForRestaurant(userId, restaurantId)
            .then(function (review){
                if(!(review == "0")){
                    res.json(review);
                    return;
                }else{
                    res.send("0");
                    return;
                }
            }, function(error){
                return res.json({error:error.message});
            }).catch(function () {
                console.log("Promise Rejected");
            });
    }else{
        res.send("0");
    }
}

function updateRestaurant(req, res){
    var restaurantId = req.params.restaurantId;
    var restaurant = req.body;

    restaurantModel
        .updateRestaurant(restaurantId,restaurant)
        .then(function (status){
            if(status){
                res.json((status));
                return;
            }else{
                res.send(404);
                return;
            }
        });
}

function createReview(req, res){
    var body = req.body;
    var restaurantId = body.restaurantId;
    var userId = body.userId;
    var review = body.review;

    reviewModel
        .createReview(userId, restaurantId,review)
        .then(function (review){
            res.json(review);
            return;
        }, function (err){
            res.statusCode(404).send(err);
        });
}

function deleteRestaurant(req, res){
    var userId = req.query.userId;
    var restaurantId = req.query.restaurantId;

    restaurantModel
        .deleteRestaurant(userId, restaurantId)
        .then(function (status){
            if(status){
                res.json(status);
                return;
            }else{
                res.send(404);
                return;
            }
        });
}

function searchRestaurantById(req, res){
    var restaurantId = req.params.yelpId;

    if(mongoose.Types.ObjectId.isValid(restaurantId))
    {
        return restaurantModel
            .findRestaurantById(restaurantId)
            .then(function (restaurant){
                if(!(restaurant == "0")){
                    res.json(restaurant);
                    return;
                }else{
                    res.send("0");
                    return;
                }
            }, function(error){
                return res.json({error:error.message});
            }).catch(function () {
                console.log("Promise Rejected");
            });
    }else{
        res.send("0");
    }
}

function getAllRestaurants(req, res){
    restaurantModel
        .getAllRestaurants()
        .then(function (restaurants){
            res.json(restaurants);
            return;
        });
}

function createRestaurant(req, res){
    var body = req.body;
    var userId = body.userId;
    var restaurant = body.restaurant;

    restaurantModel
        .createRestaurant(userId,restaurant)
        .then(function (restaurant){
            res.json(restaurant);
            return;
        }, function (err){
            res.statusCode(404).send(err);
        });
}

function searchRestaurantByYelpId(req, res){
    var yelpId = req.params.yelpId;

    var client_id = "IxPjAaoDsjXWxu7uiGZ_Rw";
    var client_secret = "7sOmpAgiqReLloF4GSGTs6VGY1ziJc89T1p3VMsIPnPqrTYTp9LHw8a7vkRZauzg";
    var accessToken = null;
    const token = yelp
        .accessToken(client_id, client_secret)
        .then(function(response) {
            console.log(response.jsonBody.access_token);
            accessToken = response.jsonBody.access_token;
            //res.json(response);
        }, function(error){
            return res.json({error:error.message});
        }).catch(function () {
            console.log("Promise Rejected");
        })
        .then(function (response){
            const client = yelp.client(accessToken);

            client.business(yelpId)
                .then(function (response){
                    //console.log(response.jsonBody.businesses[0]);
                    res.json(response);
                }, function(error){
                    return res.json({error:error.message});
                }).catch(function () {
                console.log("Promise Rejected");
            })
        })


}

function searchRestaurantByTitle(req, res){
    var title = req.query.title;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var client_id = "IxPjAaoDsjXWxu7uiGZ_Rw";
    var client_secret = "7sOmpAgiqReLloF4GSGTs6VGY1ziJc89T1p3VMsIPnPqrTYTp9LHw8a7vkRZauzg";
    var accessToken = null;
    const token = yelp
        .accessToken(client_id, client_secret)
        .then(function(response) {
            console.log(response.jsonBody.access_token);
            accessToken = response.jsonBody.access_token;
            //res.json(response);
        }, function(error){
            return res.json({error:error.message});
        }).catch(function () {
            console.log("Promise Rejected");
        })
        .then(function (response){
            const client = yelp.client(accessToken);
            console.log(latitude);
            console.log(typeof latitude);
            if(((latitude === "undefined") || (longitude === "undefined")) && (!(title === "undefined"))) {
                client.search({
                    term: title,
                    location: 'boston, ma'
                })
                    .then(function (response) {
                        console.log(response.jsonBody.businesses[0]);
                        res.json(response);
                    }, function (error) {
                        return res.json({error: error.message});
                    }).catch(function () {
                    console.log("Promise Rejected");
                })
            }else if((latitude === "undefined") || (longitude === "undefined")){
                client.search({
                    term:"food",
                    /*                    latitude: latitude,
                     longitude: longitude*/
                    location: 'boston, ma'
                })
                    .then(function (response){
                        console.log(response.jsonBody.businesses[0]);
                        res.json(response);
                    }, function(error){
                        return res.json({error:error.message});
                    }).catch(function () {
                    console.log("Promise Rejected");
                })
            }else{
                client.search({
                    term:"food"+title,
                    latitude: latitude,
                    longitude: longitude
                })
                    .then(function (response){
                        console.log(response.jsonBody.businesses[0]);
                        res.json(response);
                    }, function(error){
                        return res.json({error:error.message});
                    }).catch(function () {
                    console.log("Promise Rejected");
                })
            }
        })

}

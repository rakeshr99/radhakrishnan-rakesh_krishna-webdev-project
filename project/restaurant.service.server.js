var app = require("../express");
var mongoose = require("mongoose");
const http = require('http');
'use strict';
const yelp = require("../node_modules/yelp-fusion");
var restaurantModel = require("../project/models/restaurant/restaurant.model.server");

app.get("/api/yelp/accesstoken", searchRestaurantByTitle);
app.get("/api/yelp/:yelpId", searchRestaurantByYelpId);
app.post("/api/new-restaurant", createRestaurant);
app.get("/api/list-restaurant", getAllRestaurants);
app.get("/api/yelp/localSearch/:yelpId", searchRestaurantById);
app.delete("/api/delete-restaurant", deleteRestaurant);
app.put("/api/update-restaurant/:restaurantId", updateRestaurant);

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

/*    var accessTokenEndpointUrl = "https://api.yelp.com/oauth2/token";

    return http({method: 'POST', url: accessTokenEndpointUrl, headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*"},
        body: {'grant_type':'client_credentials', 'client_id': 'IxPjAaoDsjXWxu7uiGZ_Rw',
            'client_secret': '7sOmpAgiqReLloF4GSGTs6VGY1ziJc89T1p3VMsIPnPqrTYTp9LHw8a7vkRZauzg'}
    });*/

}

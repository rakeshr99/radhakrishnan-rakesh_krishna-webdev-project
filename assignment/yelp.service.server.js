var app = require("../express");
const http = require('http');
'use strict';
const yelp = require("../node_modules/yelp-fusion");

app.get("/api/yelp/accesstoken", searchRestaurantByTitle);
app.get("/api/yelp/:yelpId", searchRestaurantByYelpId);

function searchRestaurantByYelpId(req, res){
    var yelpId = req.query.yelpId;

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

            client.search({
                term: yelpId,
                location: 'boston, ma'
            })
                .then(function (response){
                    //console.log(response.jsonBody.businesses[0].name);
                    res.json(response);
                }, function(error){
                    return res.json({error:error.message});
                }).catch(function () {
                console.log("Promise Rejected");
            })
        })


}

function searchRestaurantByTitle(req, res){
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

            client.search({
                //term:'shake shack',
                location: 'boston, ma'
            })
                .then(function (response){
                    console.log(response.jsonBody.businesses[0].name);
                    res.json(response);
                }, function(error){
                    return res.json({error:error.message});
                }).catch(function () {
                console.log("Promise Rejected");
            })
        })

/*    var accessTokenEndpointUrl = "https://api.yelp.com/oauth2/token";

    return http({method: 'POST', url: accessTokenEndpointUrl, headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*"},
        body: {'grant_type':'client_credentials', 'client_id': 'IxPjAaoDsjXWxu7uiGZ_Rw',
            'client_secret': '7sOmpAgiqReLloF4GSGTs6VGY1ziJc89T1p3VMsIPnPqrTYTp9LHw8a7vkRZauzg'}
    });*/

}

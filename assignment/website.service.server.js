var app = require("../express");
var websiteModel = require("../assignment/models/website/website.model.server");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/user/:userId/website", findWebsitesForUser);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/user/:userId/website/:websiteId", updateWebsite);
app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

function deleteWebsite(req, res){
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;

    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status){
            if(status){
                res.json(status);
            }else{
                res.send(404);
            }
        })

/*    var website = websites.find(function (website){
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.send("true");*/
}

function findWebsiteById(req, res){
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website){
           res.json(website);
           return;
        });
/*    for(var w in websites){
        if(websites[w]._id === websiteId){
            res.send(websites[w]);
            return;
        }
    }*/
}

function updateWebsite(req, res){
    var websiteId = req.params.websiteId;
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId,website)
        .then(function (status){
            if(status){
                res.json(status);
                return;
            }else{
                res.send(404);
            }
        })
/*    for(var w in websites){
        if(websites[w]._id == websiteId){
            websites[w] = website;
            res.send(websites);
            return;
        }
    }*/
}

function createWebsite(req, res){
    var website = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website){
           res.json(website);
           return;
        }, function (err){
            res.statusCode(404).send(err);
        });
/*    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);

    res.send(websites);*/
}

function findWebsitesForUser(req, res){
    var userId = req.params.userId;

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites){
            res.json(websites);
            return;
        });

/*    var sites = [];

    for(var w in websites){
        if(websites[w].developerId === userId){
            sites.push(websites[w]);
        }
    }
    res.send(sites);*/
}
var app = require("../express");
var pageModel = require(".//models/page/page.model.server");

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.get("/api/user/:userId/website/:websiteId/page",findPageByWebsiteId);
app.post("/api/user/:userId/website/:websiteId/page",createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);

function deletePage(req, res){
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;

    pageModel
        .deletePage(websiteId, pageId)
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

function updatePage(req, res){
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId,page)
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

function findPageById(req, res){
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page){
            res.json(page);
            return;
        });
}

function createPage(req, res){
    var websiteId = req.params.websiteId;
    var page = req.body;

    pageModel
        .createPage(websiteId,page)
        .then(function (page){
            res.json(page);
            return;
        }, function (err){
            res.statusCode(404).send(err);
        });
}

function findPageByWebsiteId(req, res){
    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages){
            res.json(pages);
            return;
        });
}


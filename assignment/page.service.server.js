var app = require("../express");
var pageModel = require("../assignment/models/page/page.model.server");

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
/*    var page = pages.find(function (page){
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.send("true");
    return;*/
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
/*    for(var p in pages){
        if(pages[p]._id == pageId){
            pages[p].description = page.description;
            res.send(pages);
            return;
        }
    }*/
}

function findPageById(req, res){
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page){
            res.json(page);
            return;
        });
/*    for(var p in pages){
        if(pages[p]._id === pageId){
            res.send(pages[p]);
        }
    }*/
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
/*    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.send(pages);*/
}

function findPageByWebsiteId(req, res){
    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages){
            res.json(pages);
            return;
        });
/*    var _pages = [];

    for(var p in pages){
        if(pages[p].websiteId === websiteId){
            _pages.push(pages[p]);
        }
    }
    res.send(_pages);*/
}


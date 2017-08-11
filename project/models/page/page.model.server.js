var mongoose = require("mongoose");
var pageSchema = require("../page/page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.createPage = createPage;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;

module.exports = pageModel;

function removeWidget(pageId, widgetId){
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
}

function findAllPagesForWebsite(websiteId){
    return pageModel.find({_website : websiteId});
}

function findPageById(pageId){
    return pageModel.findById({_id : pageId});
}

function createPage(websiteId, page){
    page._website = websiteId;
    var pagetmp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc){
            pagetmp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id)
        })
        .then(function (websiteDoc) {
            return pagetmp;
        });
}

function updatePage(pageId, page){
    return pageModel.update({_id : pageId}, {$set : page});
}

function deletePage(websiteId, pageId){
    return pageModel
        .remove({_id : pageId})
        .then(function (status){
            return websiteModel.removePage(websiteId, pageId);
        });
}

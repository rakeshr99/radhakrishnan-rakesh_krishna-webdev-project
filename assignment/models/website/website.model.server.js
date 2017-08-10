var mongoose = require("mongoose");
var websiteSchema = require("../website/website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;

function removePage(websiteId, pageId){
    return websiteModel
        .findById(websiteId)
        .then(function (website){
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}

function addPage(websiteId,pageId){
    return websiteModel.findById(websiteId)
        .then(function (website){
            website.pages.push(pageId);
            website.save();
        })
}

function findAllWebsitesForUser(userId){
    return websiteModel.find({_user : userId});
}

function findWebsiteById(websiteId){
    return websiteModel.findById({_id : websiteId});
}

function createWebsiteForUser(userId, website){
    website._user = userId;
    var websitetmp = null;
    return websiteModel
            .create(website)
            .then(function (websiteDoc){
                websitetmp = websiteDoc;
                return userModel.addWebsite(userId, websiteDoc._id)
            })
            .then(function (userDoc) {
                return websitetmp;
    })
}

function updateWebsite(websiteId, website){
    return websiteModel.update({_id : websiteId}, {$set : website});
}

function deleteWebsite(userId, websiteId){
    return websiteModel
        .remove({_id : websiteId})
        .then(function (status){
            return userModel.removeWebsite(userId, websiteId);
        });


    //webisteModel.
    //    removeWebsite(developerId, websiteId)
    //then(function (status){
    //userModel.removeWebsite(developerId, websiteId)
}
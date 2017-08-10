var mongoose = require("mongoose");
var widgetSchema = require("../widget/widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.createWidget = createWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function findAllWidgetsForPage(pageId){
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page){
            console.log(page);
            return page.widgets;
        })
            //console.log(page);
    //return widgetModel.find({_page : pageId});
}

function findWidgetById(widgetId){
    return widgetModel.findById({_id : widgetId});
}

function createWidget(pageId, widget){
    widget._page = pageId;
    var widgettmp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc){
            widgettmp = widgetDoc;
            return pageModel
                .addWidget(pageId, widgetDoc._id)
                .then(function (page){
                    return widgettmp;
                });
        });
/*        .then(function (pageDoc) {
            return widgettmp;
        });*/
}

function updateWidget(widgetId, widget){
    return widgetModel.update({_id : widgetId}, {$set : widget});
}

function deleteWidget(pageId, widgetId){
    return widgetModel
        .remove({_id : widgetId})
        .then(function (status){
            return pageModel.removeWidget(pageId, widgetId);
        });
}

function reorderWidget(pageId, start, end){
    //yet to implement
    return pageModel
        .findPageById(pageId)
        .then(function (page){
            console.log(page);
             page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
            console.log(page);
            //page.markModified('widgets');
            return page.save();
        })

}
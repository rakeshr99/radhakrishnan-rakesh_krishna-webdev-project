var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
    _restaurant : {type : mongoose.Schema.Types.ObjectId, ref : "RestaurantModel"},
    total : Number,
    reviews :
        [{text :String, url:String, rating: Number, time_created:String,
            user: {name: String, image_url: String}}],
    dateCreated : {type:Date, default: Date.now}
}, {collection : "review"});

module.exports = reviewSchema;
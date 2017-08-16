var mongoose = require("mongoose");

var restaurantSchema = mongoose.Schema({
    _user : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"},
    name : String,
    image_url : String,
    is_closed : Boolean,
    phone : String,
    display_phone : String,
    review_count : Number,
    categories : [{alias: String, title: String}],
    rating : Number,
    location : [{
        address1 : String,
        address2 : String,
        address3 : String,
        city : String,
        country : String,
        cross_streets : String,
        display_address : [{type :String}],
        state :String,
        zip_code : String
    }],
    photos : [{type: String}],
    price :  String,
    url : String,
    reviews : [{type : mongoose.Schema.Types.ObjectId, ref : "ReviewModel"}],
    dateCreated : {type:Date, default: Date.now}
}, {collection : "restaurant"});

module.exports = restaurantSchema;
var mongoose = require("mongoose");
//mongoose.Promise = require('q').Promise;

var userSchema = mongoose.Schema({
    username : {type: String, unique : true},
    password : String,
    firstName : String,
    lastName : String,
    email : String,
    phone : String,
    websites : [{type : mongoose.Schema.Types.ObjectId, ref : "WebsiteModel"}],
    restaurants : [{type : mongoose.Schema.Types.ObjectId, ref : "RestaurantModel"}],
    reviews : [{type : mongoose.Schema.Types.ObjectId, ref : "ReviewModel"}],
    dateCreated : {type :Date, default : Date.now},
    roles: [{type: String, enum:["ADMIN", "CUSTOMER", "OWNER"]}],
    following: [{type :String}],
    followed : [{type : String}],
    google: {
        id: String,
        token: String
    }
}, {collection : "user"});

module.exports = userSchema;
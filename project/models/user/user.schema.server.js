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
    dateCreated : {type :Date, default : Date.now},
    roles: [{type: mongoose.Schema.Types.ObjectId, enum:["ADMIN", "STUDENT", "FACULTY"]}]
}, {collection : "user"});

module.exports = userSchema;
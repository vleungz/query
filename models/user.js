let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

UserSchema.plugin(passportLocalMongoose, {usernameField : 'email'});

module.exports = mongoose.model("User", UserSchema);

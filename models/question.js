let mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
    title: String,
    space: String,
    content: String,
    time: String,
    up: [String],
    creator:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    },
    answers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Answer"
        }
    ]
});

module.exports = mongoose.model("Question", questionSchema);

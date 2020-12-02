let mongoose = require("mongoose");

let answerSchema = mongoose.Schema({
    content: String,
    time: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    }
});

module.exports = mongoose.model("Answer", answerSchema);
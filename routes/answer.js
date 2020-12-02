let express = require("express");
let router = express.Router({mergeParams: true});
let Question = require("../models/question");
let Answer = require("../models/answer");
let middleware = require("../middleware");

//Answer create
router.post("/", middleware.isLoggedIn, function(req,res){
    //look up question using ID
    Question.findById(req.params.id,function(err, question){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            Answer.create(req.body.answer,function(err,answer){
                if(err){
                    console.log(err);
                }else{
                    answer.time = new Date().toISOString().slice(0,10);
                    //add name and id to comment
                    answer.author.id = req.user._id;
                    answer.author.name = req.user.name;
                    answer.save();
                    //save answer
                    question.answers.push(answer);
                    question.save();
                    res.redirect('/' + question._id);
                }
            })
        }
    })
})

//Answer destroy
router.delete("/:answer_id", middleware.checkAnswerOwnership, function(req,res){
    Answer.findByIdAndRemove(req.params.answer_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/" + req.params.id);
        }
    })
});

module.exports = router;


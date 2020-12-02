let Question = require("../models/question");
let Answer = require("../models/answer");

// middleware goes here
let middlewareObj ={};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkQuestionOwnership = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        Question.findById(req.params.id, function(err,foundQuestion){
            if(err || !foundQuestion){
                req.flash("error", "Question not found");
                res.redirect("back");
            }else{
                //does user own question
                if(foundQuestion.creator.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkAnswerOwnership = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        Answer.findById(req.params.answer_id, function(err,foundAnswer){
            if(err || !foundAnswer){
                req.flash("error", "Answer not found");
                res.redirect("back");
            }else{
                //does user own answer
                if(foundAnswer.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};


module.exports = middlewareObj;
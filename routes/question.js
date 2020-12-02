let express = require("express");
let router = express.Router();
let Question = require("../models/question");
let middleware = require("../middleware");

//index
router.get('/', function(req, res, next) {
    //get all questions from DB
    Question.find({}).populate('answers').exec(function(err, allQuestions){
        if(err){
            console.log(err);
        }else{
            res.render("questions/index", {questions: allQuestions, page:'questions'});
        }
    })
});

//create - add new question to db
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form
    let title = req.body.title,
        space = req.body.space,
        content = req.body.content;

    let datetime = new Date(),
        time = datetime.toISOString().slice(0,10);

    let creator ={
        id: req.user._id,
        name: req.user.name,
    }

    let newQuestion = {title: title, space: space, content:content, time:time, creator:creator};
    // Create a new question and save to DB
    Question.create(newQuestion, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
});

//new - show form to create new question
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("questions/new");
});

//show - shows answer to question
router.get("/:id",function(req,res){
    //find question with provided id
    Question.findById(req.params.id).populate("answers").exec(function(err,foundQuestion){
        if(err || !foundQuestion){
            res.redirect("back");
        }else{
            //render show template with that question
            res.render("questions/answer",{question: foundQuestion});
        }
    });
});

//update question route
router.put("/question/:id", middleware.checkQuestionOwnership, function(req, res){
    Question.findByIdAndUpdate(req.params.id, req.body.question, function(err, question){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("back");
        }
    });
});

//destroy question route
router.delete("/:id", middleware.checkQuestionOwnership, function(req,res){
    Question.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

//upvote question route
router.put("/:id", middleware.isLoggedIn, function(req, res){
    Question.findById(req.params.id, function(err, question){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                if(question.up.includes(req.user._id) === false){
                    question.up.push(req.user._id);
                    question.save();
                    res.redirect("back");
                }else{
                    for(let i = 0; i < question.up.length; i++){
                        if (question.up[i] === String(req.user._id)) {
                            question.up.splice(i, 1);
                            question.save();
                        }
                    }
                    res.redirect("back");
                }
            }
    });
});

module.exports = router;
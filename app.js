require('dotenv').config({path: __dirname + '/.env'});

const express = require('express'),
      session = require('express-session'),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      MongoStore = require('connect-mongo')(session),
      flash = require("connect-flash"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      User = require("./models/user"),
      Question = require("./models/question"),
      Answer = require("./models/answer")

//require routes
let userRouter = require('./routes/user'),
    questionRouter = require('./routes/question'),
    answerRouter = require('./routes/answer')

//db setup
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify',false);
let url = process.env.DATABASEURL || "mongodb://localhost/query"
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log("Connected to DB");
}).catch(err => {
  console.log('Error:', err.message);
});

// view engine setup
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//passport config
app.set('trust proxy', 1);

app.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use((req,res,next) => {
  if(!req.session){
    return next(new Error('Oh no')) //handle error
  }
  next(); //otherwise continue
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField : 'password',
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//call on every route
app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//use routes
app.use('/', userRouter);
app.use('/', questionRouter);
app.use('/:id/answer', answerRouter);

let port = process.env.PORT || 3000;
app.listen(port);
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
// const bodyParser = require('body-parser');
const connectDB = require('./db/db');
const expressSession = require('express-session');
// const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoute = require('./routes/user.routes');

connectDB();

app.use(cors());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(userRoute.serializeUser());
// passport.deserializeUser(userRoute.deserializeUser());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.send('Hello World');
});

app.use('/users', userRoute);

module.exports = app;
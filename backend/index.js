const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const User = require('./models/user');
const AppUser = require('./models/appuser');

// set up express app
const app = express();
// connect to mongodb
app.set('view engine','ejs');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
// mongoose.connect('mongodb://localhost/splitwise',{ useMongoClient: true });
mongoose.connect('mongodb://user:user@localhost/app?authMechanism=SCRAM-SHA-1',{ useMongoClient: true},function(errors){
    console.log('error',errors);
});

mongoose.Promise = global.Promise;

//set up static files
// app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});
// error handling middleware
app.use(function(err, req, res, next) {
    console.log(err); // to see properties of message in our console
    res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, function() {
    console.log('now listening for requests');
});
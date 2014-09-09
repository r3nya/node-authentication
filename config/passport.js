var LocalStrategy   = require('passport-local').Strategy;

// load user model
var User            = require('../app/models/user');

module.exports = function(passport) {
    // passport session setup
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // local signup
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err)
                    return done(err)

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // create user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    // local login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findOne({ 'local.email' : email }, function(err, user) {
            if (err)
                return(err);

            // if user not found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            // if user found, but password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            // all well
            return done(null, user);
        });
    }));
};


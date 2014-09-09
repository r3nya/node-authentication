module.exports = function(app, passport) {

    // home page
    app.get('/', function(req, res) {
        res.render('index')
    });

    // login
    app.get('/login', function(req, res) {
        res.render('login', { message: req.flash('loginMessage') });
    });

    // signup
    app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        succsessRedirect    : '/profile',   // redirect to the secure profile section
        failureRedirect     : '/signup',    // redirect back to the signup page if there is an error
        failureFlash        : true          // allow flash messages
    }));

    // profile
    app.get('/progile', function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};
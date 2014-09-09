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
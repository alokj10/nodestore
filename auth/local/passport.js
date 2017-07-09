var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      // User.findOne({
        console.log('passport email - ' + email);
        User.getUser({
            email: email.toLowerCase()
          }, function(err, user) {
            if (err) return done(err);

            if (!user) {
              return done(null, false, { message: 'This email is not registered.' });
            }
            if (!User.authenticate(user, password)) {
              return done(null, false, { message: 'This password is not correct. ' + password + ' - ' + user.password });
            }
            console.log('credentials match');
            return done(null, user);
      });
    }
  ));
};
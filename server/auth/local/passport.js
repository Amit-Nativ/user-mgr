import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../../api/user/user.model';

const LocalStrategy = new Strategy({ usernameField: 'email' }, User.authenticate());

passport.use(LocalStrategy);

passport.serializeUser(function (user, done) {
    done(null, { user: { id: user.id, name: user.name } });
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
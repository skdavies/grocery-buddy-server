require('dotenv').config();
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { INVALID_LOGIN, VALIDATION_ERRORS } from '../constants/errorConstants';
import models from '../models/index.js';

const { User } = models;

const loginStrategy = async (username, password, done) => {
  try {
    let user = await User.findOne({ where: { username } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: INVALID_LOGIN });
    }
  } catch (err) {
    return done(err);
  }
};

const registerStrategy = async (username, password, done) => {
  try {
    if (password.length >= 8 && password.length <= 24) {
      let hashed = await bcrypt.hash(password, 10);
      let user = await User.create({ password: hashed, username });
      return done(null, user);
    } else {
      return done(null, false, { message: VALIDATION_ERRORS.LENGTH_OUT_OF_BOUNDS(8, 24) });
    }
  } catch (err) {
    return done(err);
  }


};

const jwtStrategy = async (token, done) => {
  try {
    // could lookup user here in db and pass that
    return done(null, token.user);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

passport.use('login', new LocalStrategy({ session: false }, loginStrategy));
passport.use('register', new LocalStrategy({ session: false }, registerStrategy));

passport.use('jwt', new JWTStrategy({
  secretOrKey: process.env.GSM_JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, jwtStrategy));

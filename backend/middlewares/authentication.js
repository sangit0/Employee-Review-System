const httpStatus = require('http-status');
const passport = require('passport');
const User = require('../models/user.model');
const ErrorsMessage = require('../helpers/error-api');

const handler = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);


  const errorsMessage = new ErrorsMessage({
    status: httpStatus.UNAUTHORIZED,
    message: error ? error.message : 'Unauthorized',
    stack: error ? error.stack : undefined,
  });

  try {
    //if not authenticated directly returning next without user object
    if (error || !user) return next();
    await logIn(user, { session: false });
  } catch (e) {
    return next(errorsMessage);
  }

  req.user = user;
  return next();
};

exports.isAuth = (roles = User.roles) => (req, res, next) =>{
  passport.authenticate(
    'jwt', { session: false },handler(req, res, next, roles),
  )(req, res, next);}

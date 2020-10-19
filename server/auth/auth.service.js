import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import pify from 'pify';

const validateJwt = pify(expressJwt({secret: process.env.SESSION_SECRET}));

export const isAuthenticated = () => async (req, res) => {
  // Allow access_token to be passed through cookies parameter as well
  if (req.cookies && req.cookies.userToken) {
    req.headers.authorization = `Bearer ${req.cookies.userToken}`;
  }

  await validateJwt(req, res);
};

export function signToken (_id, expiresIn = '7d') {
  return jwt.sign({_id}, process.env.SESSION_SECRET, {expiresIn});
}
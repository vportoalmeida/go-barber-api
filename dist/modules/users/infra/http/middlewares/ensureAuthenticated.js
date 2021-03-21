"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  const {
    secret
  } = _auth.default.jwt;

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, secret);
    const {
      sub
    } = decoded;
    req.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token', 401);
  }
}
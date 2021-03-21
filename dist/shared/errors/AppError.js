"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AppError {
  constructor(message, statusCode = 400, errors = []) {
    this.message = void 0;
    this.statusCode = void 0;
    this.errors = void 0;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }

}

var _default = AppError;
exports.default = _default;
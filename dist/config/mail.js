"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'leduardo.santos.1997@gmail.com',
      name: 'Lucas Eduardo'
    }
  }
};
exports.default = _default;
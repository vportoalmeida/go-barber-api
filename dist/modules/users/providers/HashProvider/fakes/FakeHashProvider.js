"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FaketHashProvider {
  async generateHash(payload) {
    return payload;
  }

  async compareHash(payload, hashed) {
    return payload === hashed;
  }

}

var _default = FaketHashProvider;
exports.default = _default;
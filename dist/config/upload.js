"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = require("multer");

var _crypto = require("crypto");

var _path = require("path");

/* eslint-disable @typescript-eslint/interface-name-prefix */
const tempFolder = (0, _path.resolve)(__dirname, '..', '..', 'temp');
var _default = {
  driver: process.env.STORAGE_DRIVER,
  tempFolder,
  uploadsFolder: (0, _path.resolve)(tempFolder, 'uploads'),
  multer: {
    storage: (0, _multer.diskStorage)({
      destination: tempFolder,

      filename(req, file, callback) {
        const fileHash = (0, _crypto.randomBytes)(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      }

    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-2'
    }
  }
};
exports.default = _default;
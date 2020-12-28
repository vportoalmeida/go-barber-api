"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  async saveFile(file) {
    await _fs.promises.rename((0, _path.resolve)(_upload.default.tempFolder, file), (0, _path.resolve)(_upload.default.uploadsFolder, file));
    return file;
  }

  async deleteFile(file) {
    const filePath = (0, _path.resolve)(_upload.default.uploadsFolder, file);

    try {
      await _fs.promises.stat(filePath);
    } catch {
      return;
    }

    await _fs.promises.unlink(filePath);
  }

}

var _default = DiskStorageProvider;
exports.default = _default;
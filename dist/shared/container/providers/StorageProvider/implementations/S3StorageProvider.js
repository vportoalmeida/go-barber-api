"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _mime = _interopRequireDefault(require("mime"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-var-requires */
class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: 'us-east-1'
    });
  }

  async saveFile(file) {
    const originalPath = (0, _path.resolve)(_upload.default.tempFolder, file);
    this.client.putObject();

    const fileName = _mime.default.lookup(originalPath);

    const ContentType = fileName.split('.')[1];

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await _fs.promises.readFile(originalPath);
    await this.client.putObject({
      Bucket: _upload.default.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.promises.unlink(originalPath);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: _upload.default.config.aws.bucket,
      Key: file
    }).promise();
  }

}

var _default = S3StorageProvider;
exports.default = _default;
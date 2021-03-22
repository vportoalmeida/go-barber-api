"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

require("express-async-errors");

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-unused-vars */
const app = (0, _express.default)(); // app.use(cors());

app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_rateLimiter.default);
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, req, res, _) => {
  if (err instanceof _AppError.default) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  } // eslint-disable-next-line no-console


  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333!');
});
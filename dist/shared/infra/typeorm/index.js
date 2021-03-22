"use strict";

require("reflect-metadata");

var _typeorm = require("typeorm");

/* eslint-disable no-console */
(0, _typeorm.createConnections)().then(() => {
  console.log('📦 Connected to Database');
}).catch(error => {
  console.log(error);
});
"use strict";

require("reflect-metadata");

var _typeorm = require("typeorm");

(0, _typeorm.createConnections)().then(() => {
  console.log('📦 Connected to Database');
}).catch(error => {
  console.log(error);
});
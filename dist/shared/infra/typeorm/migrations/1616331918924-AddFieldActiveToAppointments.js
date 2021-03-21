"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddFieldActiveToAppointments1616331918924 {
  async up(queryRunner) {
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'active',
      type: 'boolean',
      default: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('appointments', 'active');
  }

}

exports.default = AddFieldActiveToAppointments1616331918924;
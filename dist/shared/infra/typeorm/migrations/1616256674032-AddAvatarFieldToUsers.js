"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddAvatarFieldToUsers1616256674032 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'avatar');
  }

}

exports.default = AddAvatarFieldToUsers1616256674032;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/camelcase */
class AppointmentDeleteController {
  async delete(req, res) {
    const user_id = req.user.id;
    const {
      provider_id,
      date
    } = req.body;

    const deleteAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await deleteAppointment.execute({
      provider_id,
      user_id,
      date
    });
    return res.json(appointment);
  }

}

exports.default = AppointmentDeleteController;
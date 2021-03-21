/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentDeleteController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { provider_id, date } = req.body;

    const deleteAppointment = container.resolve(DeleteAppointmentService);

    const appointment = await deleteAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    return res.json(appointment);
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserAppointmentsService from '@modules/appointments/services/ListUserAppointmentsService';

export default class UserAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { day, month, year } = req.query;

    const listUserAppointments = container.resolve(ListUserAppointmentsService);

    const appointments = await listUserAppointments.execute({
      user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(appointments));
  }
}

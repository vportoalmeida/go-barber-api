import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListClientsService from '@modules/appointments/services/ListClientsService';

export default class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const ListClients = container.resolve(ListClientsService);

    const clients = await ListClients.execute({
      user_id,
    });

    return res.json(classToClass(clients));
  }
}

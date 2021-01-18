import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllProvidersAvailabilityService from '../../../services/ListAllProvidersAvailabilityService';

export default class ProvidersAppotintmentsAvailabilityController {
  public async indexAvailability(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const user_id = req.user.id;
    const { month, year, day } = req.query;

    const listProvidersAvailability = container.resolve(
      ListAllProvidersAvailabilityService,
    );

    const providersAvailability = listProvidersAvailability.execute({
      user_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return res.json(providersAvailability);
  }
}

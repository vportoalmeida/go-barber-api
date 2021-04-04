import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import AppointmentsDeleteController from '../controllers/AppointmentsDeleteController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import UserAppointmentsController from '../controllers/UserAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const appointmentsDeleteController = new AppointmentsDeleteController();
const providerAppointmentsController = new ProviderAppointmentsController();
const userAppointmentsController = new UserAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.post(
  '/delete',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsDeleteController.delete,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);
appointmentsRouter.get('/user/me', userAppointmentsController.index);

export default appointmentsRouter;

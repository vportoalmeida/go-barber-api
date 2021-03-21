import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '../../notifications/repositories/INotificationsRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '../../../shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (!findAppointmentInSameDate) {
      throw new AppError('Appointment not found.');
    }

    findAppointmentInSameDate.active = false;

    const appointment = await this.appointmentsRepository.update(
      findAppointmentInSameDate,
    );

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Agendamento cancelado com sucesso!`,
    });

    return appointment;
  }
}

export default DeleteAppointmentService;

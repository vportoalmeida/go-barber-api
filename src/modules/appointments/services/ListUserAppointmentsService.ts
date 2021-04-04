/* eslint-disable no-var */
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import IUserAppointmentReturnDTO from '../dtos/IUserAppointmentReturnDTO';

interface IRequestDTO {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListUserAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    year,
    month,
    day,
  }: IRequestDTO): Promise<IUserAppointmentReturnDTO[]> {
    var returnUserAppointment: IUserAppointmentReturnDTO[] = [];
    var userAppointment: IUserAppointmentReturnDTO;

    const appointments = await this.appointmentsRepository.findAllInFroTodayFromUser(
      {
        user_id,
        day,
        month,
        year,
      },
    );

    const promise = appointments.map(async appointment => {
      if (appointment.active) {
        const provider = await this.usersRepository.findById(
          appointment.provider_id,
        );
        if (provider) {
          userAppointment = {
            id: appointment.id,
            date: appointment.date,
            active: appointment.active,
            created_at: appointment.created_at,
            updated_at: appointment.updated_at,
            user: {
              id: appointment.user.id,
              name: appointment.user.name,
              email: appointment.user.email,
              avatar: appointment.user.avatar,
              user_type: appointment.user.user_type,
              created_at: appointment.user.created_at,
              updated_at: appointment.user.updated_at,
              avatar_url: appointment.user.getAvatarUrl(),
            },
            provider: {
              id: provider.id,
              name: provider.name,
              email: provider.email,
              avatar: provider.avatar,
              user_type: provider.user_type,
              created_at: provider.created_at,
              updated_at: provider.updated_at,
              avatar_url: provider.getAvatarUrl(),
            },
          };
          returnUserAppointment.push(userAppointment);
        }
      }
    });
    await Promise.all(promise);
    return returnUserAppointment;
  }
}

export default ListUserAppointmentsService;

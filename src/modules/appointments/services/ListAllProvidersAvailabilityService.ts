import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, getHours, isAfter } from 'date-fns';

import AppError from '../../../shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import IProvidersAppointments from '../dtos/IProvidersAppointments';

interface IRequestDTO {
  user_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<IProvidersAppointments>;

@injectable()
class ListAllProvidersAvailabilityService {
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
  }: IRequestDTO): Promise<IResponse> {
    const providersArray = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    if (!providersArray) {
      throw new AppError('error', 400);
    }

    const providersAppointmentsArray: IProvidersAppointments[] = [];

    const promisesProviders = providersArray.map(async provider => {
      const appointmentsDays = await this.appointmentsRepository.findAllInDayFromProvider(
        { provider_id: provider.id, year, month, day },
      );

      const hourStart = 8;

      const eachHourArray = Array.from(
        { length: 10 },
        (_, index) => index + hourStart,
      );

      const currentDate = new Date(Date.now());

      const daysAvailability = eachHourArray.map(hour => {
        const hasAppointmentInHour = appointmentsDays.find(
          appointment => getHours(appointment.date) === hour,
        );

        const compareDate = new Date(year, month - 1, day, hour);

        return {
          hour,
          available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
        };
      });

      const appointmentsMonths = await this.appointmentsRepository.findAllInMonthFromProvider(
        {
          provider_id: provider.id,
          year,
          month,
        },
      );

      const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

      const eachDayArray = Array.from(
        { length: numberOfDaysInMonth },
        (_, index) => index + 1,
      );

      const monthsAvailability = eachDayArray.map(dayInMonth => {
        const compareDate = new Date(year, month - 1, day, 23, 59, 59);

        const appointmentsInDay = appointmentsMonths.filter(
          appointment => getDate(appointment.date) === dayInMonth,
        );

        return {
          dayInMonth,
          available:
            isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
        };
      });

      const object: IProvidersAppointments = {
        provider_data: provider,
        available_days: daysAvailability,
        available_months: monthsAvailability,
      };

      providersAppointmentsArray.push(object);
    });

    await Promise.all(promisesProviders);

    return providersAppointmentsArray;
  }
}

export default ListAllProvidersAvailabilityService;

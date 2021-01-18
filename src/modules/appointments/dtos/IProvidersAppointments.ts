import Users from '../../users/infra/typeorm/entities/User';

export default interface IProvidersAppointments {
  provider_data: Users;
  available_days: {
    hour: number;
    available: boolean;
  }[];
  available_months: {
    dayInMonth: number;
    available: boolean;
  }[];
}

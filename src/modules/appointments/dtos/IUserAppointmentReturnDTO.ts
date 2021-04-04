export default interface IUserAppointmentReturnDTO {
  id: string;
  date: Date;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    user_type: string;
    created_at: Date;
    updated_at: Date;
    avatar_url: string | null;
  };
  provider: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    user_type: string;
    created_at: Date;
    updated_at: Date;
    avatar_url: string | null;
  };
}

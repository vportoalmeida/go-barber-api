import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
  user_type: string;
}

@injectable()
class GetUserByEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findByEmail(email);

    await this.cacheProvider.invalidatePrefix('users-get');

    return user;
  }
}

export default GetUserByEmailService;

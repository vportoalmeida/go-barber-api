/* eslint-disable @typescript-eslint/camelcase */
import { getRepository, Repository, Not } from 'typeorm';

import IFindAllProvidersDTO from '../../../dtos/IFindAllProvidersDTO';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllCustomers(): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        user_type: 'C',
      },
    });
    return users;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
          user_type: ['A', 'P'],
        },
      });
    } else {
      users = await this.ormRepository.find({
        where: {
          user_type: ['A', 'P'],
        },
      });
    }

    return users;
  }

  public async create({
    name,
    email,
    password,
    user_type,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      user_type,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;

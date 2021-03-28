import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import GetUserService from '@modules/users/services/GetUserService';
import GetUSerByEmailService from '@modules/users/services/GetUserByEmaiService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, user_type } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password, user_type });

    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return res.json(classToClass(users));
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute(id);

    return res.json(classToClass(user));
  }

  public async getByEmail(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const getUser = container.resolve(GetUSerByEmailService);

    const user = await getUser.execute(email);

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, user_type } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id: id,
      name,
      email,
      user_type,
    });

    return res.json(classToClass(user));
  }
}

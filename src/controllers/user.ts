import { Request, Response } from 'express';
// import { User, Role } from '../db/models/index.js';
import User from '../db/models/user';
import Role from '../db/models/role';
import Respond from '../utils';

export default class Roles {
  static async create(req: Request, res: Response) {
    const user = await User.create(req.body);
    Respond.success(res, 201, 'User created', user);
  }

  static async getOne(req: Request, res: Response) {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: { model: Role, as: 'role' },
    });
    Respond.success(res, 200, 'User Found!', user);
  }

  static async getAll(req: Request, res: Response) {
    const users = await User.findAll({ include: { model: Role, as: 'role' } });
    Respond.success(res, 200, 'Users Found!', users);
  }

  static async delete(req: Request, res: Response) {
    const user = await User.destroy({ where: { id: req.params.id } });
    Respond.success(res, 200, 'User deleted!', user);
  }

  static async update(req: Request, res: Response) {
    const user = await User.findOne({ where: { id: req.params.id } });
    const userExists = await User.findOne({ where: req.body });
    if (userExists) return Respond.error(res, 409, 'User already exists!');

    await user?.update(req.body);
    return Respond.success(res, 200, 'User updated!', user);
  }
}

import { Request, Response } from 'express';
import Role from '../db/models/role';
import Respond from '../utils';

export default class Roles {
  static async create(req: Request, res: Response) {
    const role = await Role.create(req.body);
    Respond.success(res, 201, 'Role created', role);
  }

  static async delete(req: Request, res: Response) {
    const role = await Role.destroy({ where: { id: req.params.id } });
    Respond.success(res, 200, 'Role deleted!', role);
  }

  static async update(req: Request, res: Response) {
    const role = await Role.findOne({ where: { id: req.params.id } });
    const roleExists = await Role.findOne({ where: req.body });
    if (roleExists) return Respond.error(res, 409, 'Role already exists!');

    await role?.update(req.body);
    return Respond.success(res, 200, 'Role updated!', role);
  }
}

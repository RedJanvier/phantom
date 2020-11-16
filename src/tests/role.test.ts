import { it, beforeEach, afterEach } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { endpoints } from './constants/constants';
import app from '..';
import User from '../db/models/user';
import Role from '../db/models/role';

chai.use(chaiHttp);

interface RoleBody {
  name: string;
}
interface UserBody {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  roleId?: number;
}

export default () => {
  const testUser: UserBody = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'jdoe@email.com',
    password: 'test@123',
    roleId: 1,
  };
  const testAdminRole: RoleBody = {
    name: 'admin',
  };
  beforeEach(async () => {
    await User.destroy({ where: { email: testUser.email } });
    await Role.destroy({ where: { name: testAdminRole.name } });
  });
  afterEach(async () => {
    await User.destroy({ where: { email: testUser.email } });
    await Role.destroy({ where: { name: testAdminRole.name } });
  });
  it('should create a role', async () => {
    const res = await chai
      .request(app)
      .post(endpoints.roles)
      .send(testAdminRole);
    expect(res).to.have.property('status', 201);
  });
  it('should update a single role', async () => {
    const roleId = 1;
    const body: RoleBody = { name: 'new name' };
    const res = await chai
      .request(app)
      .patch(endpoints.role(roleId))
      .send(body);
    expect(res).to.have.property('status', 200);
  });
  it('should delete a single role', async () => {
    const roleId = 1;
    const res = await chai.request(app).delete(endpoints.role(roleId));
    expect(res).to.have.property('status', 200);
  });
};

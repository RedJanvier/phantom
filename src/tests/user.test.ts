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
  firstname: string;
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
  it('should create a user', async () => {
    const res = await chai.request(app).post(endpoints.users).send(testUser);
    expect(res).to.have.property('status', 201);
  });
  it('should get all users', async () => {
    const res = await chai.request(app).get(endpoints.users);
    expect(res).to.have.property('status', 200);
  });
  it('should get a single user', async () => {
    const role: Role = await Role.create(testAdminRole);
    const user: User = await User.create({ ...testUser, roleId: role.id });
    const userId: number = user.id;
    const res = await chai.request(app).get(endpoints.user(userId));
    expect(res).to.have.property('status', 200);
  });
  it('should update a single user', async () => {
    const userId = 1;
    const body: UserBody = { firstname: 'new name' };
    const res = await chai
      .request(app)
      .patch(endpoints.user(userId))
      .send(body);
    expect(res).to.have.property('status', 200);
  });
  it('should delete a single user', async () => {
    const userId = 1;
    const res = await chai.request(app).delete(endpoints.user(userId));
    expect(res).to.have.property('status', 200);
  });
};

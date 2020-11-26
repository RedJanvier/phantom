import { it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

chai.use(chaiHttp);

export default () => {
  it('should test the test endpoint', async () => {
    const res = await chai.request(app).get('/api');
    expect(res).to.have.property('status', 200);
  });
};

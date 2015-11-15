import httpMocks from 'node-mocks-http';
import routes from '../../server/routes';
import firstRes from '../../server/middleware/firstRes';
import midRes from '../../server/middleware/midRes';

import request from 'supertest';
import app from '../src/app';

describe('routing tests', () => {

// route should call what middleware?
// middleware should do what.

  it('shoud call next', (done) => {
      // var req = httpMocks.createRequest();
      // var res = httpMocks.createResponse();
      request(app)
        .get('/')
        .expect(200);
      done();

      // expect(false).to.be.false;

  });



});

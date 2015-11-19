import httpMocks from 'node-mocks-http';
import firstRes from '../../../server/middleware/firstRes';

describe('Middleware - FirstRes tests', () => {

    it('shoud call next', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        firstRes(req, res, function () {
            done();
        });

    });

    it('shoud set locals', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        firstRes(req, res, function () {
            expect(res.locals.name).to.equal('Craigy');
            done();
        });
    });

});

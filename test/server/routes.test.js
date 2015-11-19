import request from 'supertest';
import firstRes from '../../server/middleware/firstRes';
import midRes from '../../server/middleware/midRes';
import express from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';

function emptyResponse(req, res) {
    res.send('');
}
function emptyNextResponse(req, res, next) {
    next();
}

function createServer(appRoutes) {
    const app = express();

    app.engine('mustache', mustacheExpress());
    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/../views');
    app.use(appRoutes);

    return app.listen(7081);
};

function closeServer(app, done) {
    app.close(done);
};

let stubFirstRes;
let stubMiddleRes;
let app;

describe('routing tests', () => {
    beforeEach(function () {
        stubFirstRes = sinon.stub(firstRes, 'firstRes', emptyNextResponse);
        stubMiddleRes = sinon.stub(midRes, 'midRes', emptyResponse);

        delete require.cache[path.join(__dirname, '../../server/routes.js')]; //invalidate cache
        const routes = require('../../server/routes');
        app = createServer(routes);
    });

    afterEach(function (done) {
        stubFirstRes.restore();
        stubMiddleRes.restore();

        closeServer(app, done);
    });

    it('shoud call correct middleware', (done) => {
        request(app)
          .get('/')
          .end(function() {
              sinon.assert.callOrder(stubFirstRes, stubMiddleRes);
              expect(stubFirstRes.calledOnce).to.be.true;
              done();
          });
    });

    it('shoud not call correct middleware', (done) => {
        request(app)
          .get('/false')
          .end(function() {
              expect(stubFirstRes.calledOnce).to.be.false;
              done();
          });
    });

});

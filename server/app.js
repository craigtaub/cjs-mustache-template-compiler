import express from 'express';
import routes from './routes';
import server from './server';
import mustacheExpress from 'mustache-express';
const app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/../views');
app.use(express.static(__dirname + '/../public')); // set static folder

routes(app);

server(app);


// module.exports = app;
// export default app;

import express from 'express';
import router from './routes';
import mustacheExpress from 'mustache-express';
const app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/../views');
app.use(express.static(__dirname + '/../public')); // set static folder

app.use(router);

const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

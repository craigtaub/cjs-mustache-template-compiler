export default function (req, res, next) {
  // res.send('Hello World!');
    res.locals = {name: 'Craigy'};
    next();
}

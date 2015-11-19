function firstRes(req, res, next) {
  // res.send('Hello World!');
    res.locals = {name: 'Craigy'};
    next();
}

export default {
    firstRes
}

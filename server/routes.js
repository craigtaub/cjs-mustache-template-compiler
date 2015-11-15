import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
  // res.send('Hello World!');
    res.render('first', {name: "craig"});
});

export default router;

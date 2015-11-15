// module.exports = function(app){
//   app.get('/', function (req, res) {
//     // res.send('Hello World!');
//     res.render('first', {name: "craig"});
//   });
// };

export default function(app){
  app.get('/', function (req, res) {
    // res.send('Hello World!');
    res.render('first', {name: "craig"});
  });
};

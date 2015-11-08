var fs = require('fs');
var templates;

function buildTemplates() {
  var files = fs.readdirSync('views');
  files.forEach(function (item) {
    if (item === 'partials') {
      var partials = fs.readdirSync('views/' + item);
      partials.forEach(function (partialItem) {
        var data = fs.readFileSync('views/partials/' + partialItem);
        if (!templates) { templates = {}; }
        templates[partialItem] = data.toString();
      });
    } else {
      var data = fs.readFileSync('views/' + item);
      if (!templates) { templates = {}; }
      templates[item] = data.toString();
    }
  });
  // console.log('templates: ', templates);
}


  // FORGET THE ASYNC
  // fs.readdir('views', function (err, files) {
  //   files.forEach(function (item) {
  //     // var re = new RegExp("^.*\.mustache$"); // view REGEX
  //     // if(!re.test(item)) {
  //     if (item === 'partials') {
  //       fs.readdir('views/' + item, function (err, partials) {
  //           partials.forEach(function (partialItem) {
  //               // console.log(partialItem);
  //               fs.readFile('views/' + partialItem, 'utf8', function (err,data) {
  //                   templates[partialItem] = data;
  //               });
  //           });
  //       });
  //     } else {
  //       console.log("found: " + item);
  //       fs.readFile(item, 'utf8', function (err,data) {
  //           console.log("opened: " + item);
  //           templates[item] = data;
  //       });
  //     }
  //   });
  // });


buildTemplates();
startOfFile();
renderTemplates();

function startOfFile() {
  console.log('module.exports = ');
}

function renderTemplates() {
    console.log(JSON.stringify(templates));
}

var templates = require('./templates');
var Mustache = require('mustache');

function bootstrap() {
  setTimeout(
    function() {
      var markup = Mustache.render(
        templates['first.mustache'], //template
        {name: "Your name"}, // view values
        {'partials/two': templates['two.mustache']} // partials, another template, using view values.
      );
      $('h1').html(markup);
    },
    1000
  );

}

module.exports = {
    bootstrap: bootstrap
};

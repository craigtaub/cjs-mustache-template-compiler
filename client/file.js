import templates from './templates';
import Mustache from 'mustache';

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

export default {bootstrap};

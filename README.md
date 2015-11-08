Simple solution for compiling mustache templates into CommonJS Module for server-side or (via browserify) client-side use.
Pre-compiled templates.
NOT fully renders into HTML..needs to be dynamic..Mustache into JS..
"Ultimately, all I want is a function that I can call with some variable to render the string I want."
Browserify will convert CJS into Vanilla JS and built it in bundle.

INTERFACE:
compile in some way..
use with:
template(templateName, options);
LIKE https://github.com/HenrikJoreteg/templatizer


-- Mustache Template
- object of {file: contents}
- Mustache wrapped in CJS.
- compile with:
#rm client/templates.js && node lib/parse.js  >> client/templates.js
--

--- ARCH
Server-side: node + express + mustache
Client-side: page + browserfiy + mustache?

TODO:
- watcher (https://gist.github.com/danharper/3ca2273125f500429945)
- linter
- tester
--


--- Research
MUSTACHE PARTIALS:
- even if does under .partials object how will mustache compiler know to look for them?
it wont...
-- IT looks in 3rd argument for key/value of partial name.
- rendered at run-time not compile-time


HOGAN:
- creates global templates object.
- can compile into template BUT isnt CommonJS Module so has no Hogan ref and doesnt export.
- doesnt build partials as Hogan templates
- must compile Template/Partials seperately

COMMONJS COMPILER:
https://github.com/dsheiko/cjsc
makes CJS modules suitable for browser use...browserify???
https://github.com/dsheiko/cjsc/blob/master/demo/use-mustache.js
- doesnt wrap mustache view in CJS.
- i need template wrapped in CJS
- HAVE to compile template with dynamic params in..cant work.

JADE:
- nice that partials are contained within so dont register them (Handlebars) or pass as 3rd argument (Mustache)
---

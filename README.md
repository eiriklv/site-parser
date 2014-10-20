Site-Parser - Parse Websites with Templates
====================================================

#### TODO
* Create proper documentation of the template options and workings
* Add test suite with Jest/Jasmine

#### Introduction:
Parses websites and creates JSON data-structures.

#### How to use it:

```js
// logging dependencies
var debug = require('debug')('site-parser:testapp');
var util = require('util');

// your template (see 'Example Template further down..')
var template = require('./template');

// require into your project
var SiteParser = require('site-parser');

// create an instance
var siteParser = new SiteParser({
    timeOut: 5000, // timout for polling the site
    agent: null // insert an optional http agent here
});

// attach listener to 'data' event (all your results will end up here)
siteParser.on('data', function (result) {
    debug('got some data!');
    
    debug(util.inspect(result, {
        colors: true,
        depth: null
    }));
});

// attach a listener to the 'error' event (all errors will end up here)
siteParser.on('error', function (err) {
    debug('got an error');
    debug(util.inspect(err));
});

// call the 'parse' function to perform the parsing
// you can also pass optional meta-data as the second parameter,
// which can be used to identify your results
siteParser.parse(template, {
    id: 56,
    rev: 23456
});
```

#### Example Template:

```js
{
    "name": "New Yorker",
    "url": "http://www.newyorker.com/",
    "format": "desktop",
    "template": {
        "containers": [{
            "elements": [{
                "items": [{
                    "attribute": "href",
                    "selector": "section h2 a"
                }],
                "name": "url",
                "occurence": "first",
                "required": true,
                "type": "url"
            }, {
                "items": [{
                    "selector": "section h2 a"
                }],
                "name": "title",
                "occurence": "first",
                "required": true
            }, {
                "items": [{
                    "selector": "section h3 span a"
                }],
                "name": "author",
                "occurence": "first"
            }, {
                "items": [{
                    "selector": "p.p-summary"
                }],
                "name": "description",
                "occurence": "first"
            }, {
                "fallback": null,
                "items": [{
                    "attribute": "src",
                    "selector": "figure a img"
                }, {
                    "attribute": "data-lazy-src",
                    "selector": "figure a img"
                }],
                "name": "image",
                "occurence": "first",
                "type": "url"
            }],
            "selector": "article"
        }]
    }
}
```

#### Example Output:

```js
{
    meta: {
        id: 56,
        rev: 23456
    },
    output: [{
        origin: 'http://www.newyorker.com/',
        url: 'http://www.newyorker.com/magazine/2014/10/27/alan-bean-plus-four',
        author: 'Tom Hanks',
        title: '“Alan Bean Plus Four”',
        description: '“When I tell people that I’ve seen the far side of the moon, they often say, ‘You mean the dark side,’ as though I’d fallen under the spell of Darth Vader or Pink Floyd.”',
        image: 'http://www.newyorker.com/wp-content/uploads/2014/10/141027_r25654-728-375-4.jpg',
        ranking: 1
    }, {
        origin: 'http://www.newyorker.com/',
        url: 'http://www.newyorker.com/magazine/2014/10/27/ebola-wars',
        author: 'Richard Preston',
        title: 'The Ebola Wars',
        description: 'As the Ebola epidemic widens, the virus is mutating. Geneticists are racing to keep up.',
        image: 'http://www.newyorker.com/wp-content/uploads/2014/10/141027_r25672-320-240.jpg',
        ranking: 2
    }, {
        origin: 'http://www.newyorker.com/',
        url: 'http://www.newyorker.com/magazine/2014/10/27/voting-numbers',
        author: 'Jelani Cobb',
        title: 'Who’s Missing from the Midterms?',
        description: 'Why our government doesn’t look like the people it’s supposed to represent.',
        image: 'http://www.newyorker.com/wp-content/uploads/2014/10/141027_r25680illurgb-320-240.jpg',
        ranking: 3
    }
    .....]
}
```

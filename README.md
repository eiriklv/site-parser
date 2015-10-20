Parse Websites using custom JSON Templates
====================================================

#### TODO
* Create proper documentation of the template options and workings
* Add test suite with Jest/Jasmine
* Publish on npm :D

#### Introduction:
Parses websites and creates JSON data-structures.

#### How to use it:

If you want debug output
* `export DEBUG='*'` (OSX/Unix)

```js
var debug = require('debug')('site-parser:testapp');
var util = require('util');
var site = require('./template');
var SiteParser = require('site-parser');

var siteParser = new SiteParser({
    timeOut: 5000
});

debug('running scraper');

siteParser.parse(site, function(err, entries) {
    if (err) return debug(err);
    debug(util.inspect(entries, { colors: true }));
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
[{
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
```

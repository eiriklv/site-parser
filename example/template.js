exports = module.exports = {
    name: 'New Yorker',
    url: 'http://www.newyorker.com/',
    format: 'desktop',
    template: {
        containers: [{
            selector: 'article',
            elements: [{
                name: 'url',
                type: 'url',
                occurence: 'first',
                required: true,
                items: [{
                    selector: 'section h2 a',
                    attribute: 'href'
                }]
            }, {
                name: 'author',
                occurence: 'first',
                items: [{
                    selector: 'section h3 span a'
                }]
            }, {
                name: 'title',
                required: true,
                occurence: 'first',
                items: [{
                    selector: 'section h2 a'
                }]
            }, {
                name: 'description',
                occurence: 'first',
                items: [{
                    selector: 'p.p-summary',
                }]
            }, {
                name: 'image',
                type: 'url',
                occurence: 'first',
                fallback: null,
                items: [{
                    selector: 'figure a img',
                    attribute: 'src'
                }, {
                    selector: 'figure a img',
                    attribute: 'data-lazy-src'
                }]
            }]
        }]
    }
};

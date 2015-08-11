exports = module.exports = {
    active: true,
    name: 'Dagbladet',
    url: 'http://www.dagbladet.no/',
    charset: 'iso-8859-1',
    format: 'desktop',
    template: {
        containers: [{
            selector: 'div.ref div.container',
            elements: [{
                name: 'url',
                type: 'url',
                occurence: 'first',
                required: true,
                items: [{
                    selector: 'h2 a',
                    attribute: 'href'
                }]
            }, {
                name: 'title',
                required: true,
                occurence: 'first',
                items: [{
                    selector: 'h2 a'
                }]
            }, {
                name: 'image',
                type: 'url',
                occurence: 'first',
                fallback: null,
                items: [{
                    selector: 'img.boxImg',
                    attribute: 'src'
                }, {
                    selector: 'img.lazy',
                    attribute: 'src'
                }]
            }]
        }]
    }
};

var debug = require('debug')('site-parser:testapp');
var util = require('util');
var site = require('./template');
var SiteParser = require('../lib');

var siteParser = new SiteParser({
    timeOut: 5000
});

siteParser.on('data', function (result) {
    debug('got updated data');
    debug(util.inspect(result, { colors: true, depth: null }));
});

siteParser.on('error', function (err) {
    debug('got an error');
    debug(util.inspect(err));
});

debug('running scraper');

siteParser.parse(site, {
    id: 56,
    rev: 23456
});

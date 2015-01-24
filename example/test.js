var debug = require('debug')('site-parser:testapp');
var util = require('util');
var site = require('./template');
var SiteParser = require('../lib');

var siteParser = SiteParser({
    timeOut: 5000
});

debug('running scraper');

siteParser.parse(site, function(err, entries) {
    if (err) return debug(err);
    debug(util.inspect(entries, { colors: true }));
});

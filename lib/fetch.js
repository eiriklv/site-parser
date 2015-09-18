var async = require('async');
var util = require('util');
var request = require('request');
var debug = require('debug')('site-parser:fetch');
var userAgents = require('./user-agents')();
var iconv = require('iconv-lite');

exports = module.exports = function(site, agent, callback) {
    var requestOptions = {
        url: site.url,
        encoding: null, // return body as a buffer with no encoding
        headers: {
            'user-agent': userAgents[site.format] || userAgents['desktop']
        },
        pool: agent,
        timeout: this.timeOut
    };

    request(requestOptions, function(err, response, body) {
        if (!err && site.charset && iconv.encodingExists(site.charset)) {
            debug('<- converting charset to ' + site.charset + ' ->');
            var temp = iconv.decode(body, site.charset);
            body = iconv.encode(temp, 'utf-8');
        }

        // replace breakpoints with spaces
        var cleanedBody = (body || '')
          .replace(/<\s*\/?\s*br?\s*\/?> {1}/ig, ' ')
          .replace(/<\s*\/?\s*br?\s*\/?>/ig, ' ')

        callback(err, body);
    });
};

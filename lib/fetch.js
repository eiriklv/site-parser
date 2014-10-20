var async = require('async');
var util = require('util');
var request = require('request');
var debug = require('debug')('site-parser:fetch');
var userAgents = require('./user-agents')();

exports = module.exports = function(site, agent, callback) {
    var requestOptions = {
        url: site.url,
        encoding: null, // return body as a buffer with no encoding
        headers: {
            'user-agent': userAgents[site.format] || userAgents['desktop']
        },
        pool: agent
    };

    request(requestOptions, function(err, response, body) {
        if (err) {
            this.emit('error', {
                msg: 'error when polling site: ' + site.url,
                err: err
            });
        }
        callback(err, body);
    });
};

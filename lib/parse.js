var async = require('async');
var debug = require('debug')('site-parser:parse');
var colors = require('colors');
var util = require('util');

exports = module.exports = function(template, meta) {
    if (!template) return debug('no template supplied');

    async.waterfall([
        function fetchSiteData(callback) {
            this._fetch(template, this.agent, callback);
        }.bind(this),

        function formatToJSON(body, callback) {
            body ? this._handler(body, template, callback) : callback();
        }.bind(this),

    ], function(err, results) {
        if (err) return this.emit('error', err);
        
        this.emit('data', {
            output: results,
            meta: meta
        });
    }.bind(this));
};

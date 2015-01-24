var async = require('async');
var debug = require('debug')('site-parser:parse');
var colors = require('colors');
var util = require('util');

exports = module.exports = function(template, callback) {
    if (!template) return debug('no template supplied');

    async.waterfall([
        this._fetch.bind(this, template, this.agent),
        this._handler.bind(this, template)
    ], callback);
};

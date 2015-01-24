var async = require('async');

exports = module.exports = function(template, callback) {
    if (!template) return callback('no template supplied');

    async.waterfall([
        this._fetch.bind(this, template, this.agent),
        this._handler.bind(this, template)
    ], callback);
};

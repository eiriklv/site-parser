var http = require('http');

exports = module.exports = Parser;

function Parser(options) {
    if (!(this instanceof Parser))
        return new Parser(options);

    this.timeOut = options.timeOut || 10000;
    this.agent = new http.Agent(); // http agent
    this.agent.maxSockets = options.sockets || 5;
}

Parser.prototype._handler = require('./handler');
Parser.prototype._fetch = require('./fetch');
Parser.prototype.parse = require('./parse');

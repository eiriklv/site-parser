var http = require('http');

function Parser(options) {
    var agent = options.agent || (new http.Agent());
    agent.maxSockets = options.agent ? agent.maxSockets : (options.sockets || 5);
    this.agent = agent;
    this.timeOut = options.timeOut || 10000;
}

Parser.prototype._handler = require('./handler');
Parser.prototype._fetch = require('./fetch');
Parser.prototype.parse = require('./parse');

exports = module.exports = Parser;

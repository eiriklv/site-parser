var url = require('url');

exports = module.exports = {
    fixRelativePath: function (link, source) {
        var pat = /^https?:\/\//i;
        
        if (!link) return;
        return !pat.test(link) ? url.resolve(source, link) : link;
    }
};

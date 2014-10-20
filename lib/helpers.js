var url = require('url');

exports = module.exports = {
    fixRelativePath: function (link, source) {
        if (!link) return;

        var pat = /^https?:\/\//i;
        return !pat.test(link) ? url.resolve(source, link) : link;
    }
};

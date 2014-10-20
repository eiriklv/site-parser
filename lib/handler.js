var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var util = require('util');
var url = require('url');
var helpers = require('./helpers');

exports = module.exports = function(body, site, callback) {
    try {
        parseSite(body, site, callback);
    } catch (e) {
        callback({
            template: site.name,
            msg: 'There is a problem with your supplied template',
            error: e
        });
    }
};

function parseSite(body, site, callback) {
    var $ = cheerio.load(body);
    var resultList = [];
    var ranking = 1;

    // THIS IS SYNCRONOUS (AND SHOULD/HAS TO BE)
    site.template.containers.forEach(function(container) {
        // loop through all the container types that can hold articles
        $(container.selector).each(function() {
            // flag for valid entry
            var validEntry = true;

            // article-entry
            var entry = {
                origin: site.url
            };

            // add article styles to entry
            processContainer($, container, this, entry);

            // this is where we fetch all the data
            container.elements.forEach(function(element) {
                // loop through all the items
                element.items.forEach(function(item) {

                    var allowed = ['first', 'last', 'all'];
                    var method = 'first';
                    var selected;
                    var result;

                    // force which element to pick from the results (first or last, default to each)
                    if (element.occurence && ~allowed.indexOf(element.occurence.toLowerCase())) {
                        method = element.occurence.toLowerCase();
                    }

                    // process on item-level
                    if (method === 'all') {
                        // iterate through the matches
                        $(this).find(item.selector).each(function() {
                            selected = this;
                            result = processItem($, selected, item, element);

                            // set item if it has been found
                            if (result) {
                                entry[element.name] = entry[element.name] || []
                                entry[element.name].push(result);
                            }
                        });
                    } else if (method === 'last') {
                        selected = $(this).find(item.selector).last();
                        result = processItem($, selected, item, element);

                        // set item if it has been found
                        if (result && !entry[element.name]) {
                            entry[element.name] = result;
                        }
                    } else {
                        selected = $(this).find(item.selector).first();
                        result = processItem($, selected, item, element);

                        // set item if it has been found
                        if (result && !entry[element.name]) {
                            entry[element.name] = result;
                        }
                    }

                }.bind(this));

                // process on entry-level
                entry = processElement(element, entry);

                // check if item is required for entry to be valid, and then check if item is set
                // validEntry cascades through every item, so that all required properties must be valid
                // to get make validEntry true at the end
                if (element.required && !entry[element.name]) {
                    validEntry = false;
                } else {
                    validEntry = validEntry && true;
                }

            }.bind(this));

            // push entry to array (if a link is found in the article)
            if (validEntry) {
                entry.ranking = ranking++;
                resultList.push(entry);
            }
        });
    });

    callback(null, resultList);
    //return resultList;
}

function processItem($, selected, item, element, callback) {
    var holder; // hold the results
    var tempHolder; // temporary holder helper

    // find attribute (use element text if no attribute is provided)
    if (item.attribute && $(selected).attr(item.attribute)) {
        holder = $(selected).attr(item.attribute).trim();
    } else {
        holder = $(selected).text().trim();
    }

    // delimit the text if required (on a certain text-phrase like "read more")
    var delimiter = element.delimiter || item.delimiter;
    if (holder && delimiter) {
        tempHolder = holder.toString();
        holder = tempHolder.slice(0, tempHolder.indexOf(delimiter)).trim();
    }

    // attach classes if required
    if (holder && (element.classes || item.classes)) {
        holder = {
            content: holder,
            classes: $(selected).attr('class') || ''
        };
    }

    return holder;
}

function processElement(element, entry) {
    // add fallback if supplied
    if (element.fallback && !entry[element.name]) {
        entry[element.name] = element.fallback;
    }

    // resolve relative urls
    if (entry[element.name] && (element.type == 'url')) {
        entry[element.name] = helpers.fixRelativePath(entry[element.name], entry.origin);
    }

    return entry;
}

function processContainer($, container, selected, entry) {
    if (container.classes) {
        entry.classes = $(selected).attr('class').split(' ');
    }
}

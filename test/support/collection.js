/**
 * Created by tsq on 14-6-24.
 */
var request = require('request')
var should = require('should')
request = request.defaults({jar: true});
var querystring = require("querystring");
function Collection(resource) {
    this.resource = resource;
    this.urlObj = {
        protocol: 'http',
        hostname: process.env.NODE_HOST || 'localhost',
        port: process.env.PORT || '1400',
        pathname: '/' + resource
    }
    this.url = require('url').format(this.urlObj);
    this.json = true;
}

Collection.prototype.request = function (options, fn) {
    var url = this.url;
    options.url = url + (options.url ? '?' + querystring.stringify(options.url): '');
    options.json = options.json || this.json;
    console.log("options", options);
    request(options, fn);
}

Collection.prototype.post = function (options, fn) {
    options.method = 'POST';
    this.request(options, fn);
}

Collection.prototype.get = function (options, fn) {
    options.method = 'GET';
    this.request(options, fn);
}

Collection.prototype.put = function (options, fn) {
    options.method = 'PUT';
    this.request(options, fn);
}

Collection.prototype.del = function (options, fn) {
    options.method = 'DELETE';
    this.request(options, fn);
}



exports = module.exports = Collection;

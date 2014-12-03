
/**
 * Module dependencies
 */

var request = require('superagent');
var debug = require('debug')('mango:api');

// Constants
var BASE_URL = "https://api.getmango.com/v1";

/**
 * Resource constructor
 *
 * @param {Mango} mango
 */

function Resource(mango) {
  this._mango = mango;
}

/**
 * Perform requests
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @param {Function} callback
 */

Resource.prototype.request = function(method, url, data, fn) {
  debug('Starting %s request to %s', method, url);

  if('function' == typeof data) {
    fn = data;
    data = null;
  }

  request(method, BASE_URL + url)
    .auth(this._mango._api_key, '')
    .query(method === 'get' && data || {})
    .send(method !== 'get' && data || {})
    .on('error', fn)
    .end(function(res){
      if(res.ok) {
        fn(null, res.body);
      } else {
        fn(res.error, null);
      }
    });

  return this;
};

/**
 * Expose constructor
 */

module.exports = Resource;

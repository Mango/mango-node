
/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Promotions;

/**
 * Promotions constructor
 */

function Promotions(mango) {
  Resource.call(this, mango);
}

util.inherits(Promotions, Resource);

/**
 * Get promotion
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Promotions.prototype.get = function(uid, fn) {
  return this.request('get', '/promotions/' + uid + '/', fn);
};

/**
 * List promotions
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Promotions.prototype.list = function(options, fn) {
  return this.request('get', '/promotions/', options, fn);
};


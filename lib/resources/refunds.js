
/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Refunds;

/**
 * Refunds constructor
 */

function Refunds(mango) {
  Resource.call(this, mango);
}

util.inherits(Refunds, Resource);

/**
 * Get refund
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Refunds.prototype.get = function(uid, fn) {
  return this.request('get', '/refunds/' + uid + '/', fn);
};

/**
 * List refunds
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Refunds.prototype.list = function(options, fn) {
  return this.request('get', '/refunds/', options, fn);
};

/**
 * Create refund
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Refunds.prototype.create = function(options, fn) {
  return this.request('post', '/refunds/', options, fn);
};


/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Coupons;

/**
 * Coupons constructor
 */

function Coupons(mango) {
  Resource.call(this, mango);
}

util.inherits(Coupons, Resource);

/**
 * Get coupon
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Coupons.prototype.get = function(uid, fn) {
  return this.request('get', '/coupons/' + uid + '/', fn);
};

/**
 * List coupons
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Coupons.prototype.list = function(options, fn) {
  return this.request('get', '/coupons/', options, fn);
};

/**
 * Create coupon
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Coupons.prototype.create = function(options, fn) {
  return this.request('post', '/coupons/', options, fn);
};

/**
 * Update coupon
 *
 * @param {string} uid
 * @param {object} options
 * @param {function} callback
 * @api public
 */

Coupons.prototype.update = function(uid, options, fn) {
  return this.request('patch', '/coupons/' + uid + '/', options, fn);
};

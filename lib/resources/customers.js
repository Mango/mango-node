
/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Customers;

/**
 * Customers constructor
 */

function Customers(mango) {
  Resource.call(this, mango);
}

util.inherits(Customers, Resource);

/**
 * Get customer
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Customers.prototype.get = function(uid, fn) {
  return this.request('get', '/customers/' + uid + '/', fn);
};

/**
 * List customers
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Customers.prototype.list = function(options, fn) {
  return this.request('get', '/customers/', options, fn);
};

/**
 * Create customer
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Customers.prototype.create = function(options, fn) {
  return this.request('post', '/customers/', options, fn);
};

/**
 * Update customer
 *
 * @param {string} uid
 * @param {object} options
 * @param {function} callback
 * @api public
 */

Customers.prototype.update = function(uid, options, fn) {
  return this.request('patch', '/customers/' + uid + '/', options, fn);
};

/**
 * Delete customer
 *
 * @param {string} uid
 * @param {function} callback
 * @api public
 */

Customers.prototype.del = function(uid, fn) {
  return this.request('delete', '/customers/' + uid + '/', fn);
};

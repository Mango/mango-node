
/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Charges;

/**
 * Charges constructor
 */

function Charges(mango) {
  Resource.call(this, mango);
}

util.inherits(Charges, Resource);

/**
 * Get charge
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Charges.prototype.get = function(uid, fn) {
  return this.request('get', '/charges/' + uid + '/', fn);
};

/**
 * List charges
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Charges.prototype.list = function(options, fn) {
  return this.request('get', '/charges/', options, fn);
};

/**
 * Create charge
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Charges.prototype.create = function(options, fn) {
  return this.request('post', '/charges/', options, fn);
};


/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Cards;

/**
 * Cards constructor
 */

function Cards(mango) {
  Resource.call(this, mango);
}

util.inherits(Cards, Resource);

/**
 * Get card
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Cards.prototype.get = function(uid, fn) {
  return this.request('get', '/cards/' + uid + '/', fn);
};

/**
 * List cards
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Cards.prototype.list = function(options, fn) {
  return this.request('get', '/cards/', options, fn);
};

/**
 * Create card
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Cards.prototype.create = function(options, fn) {
  return this.request('post', '/cards/', options, fn);
};

/**
 * Update card
 *
 * @param {string} uid
 * @param {object} options
 * @param {function} callback
 * @api public
 */

Cards.prototype.update = function(uid, options, fn) {
  return this.request('patch', '/cards/' + uid + '/', options, fn);
};

/**
 * Delete card
 *
 * @param {string} uid
 * @param {function} callback
 * @api public
 */

Cards.prototype.del = function(uid, fn) {
  return this.request('delete', '/cards/' + uid + '/', fn);
};

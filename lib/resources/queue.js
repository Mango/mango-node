
/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Queue;

/**
 * Refunds constructor
 */

function Queue(mango) {
  Resource.call(this, mango);
}

util.inherits(Queue, Resource);

/**
 * Get queue item
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Queue.prototype.get = function(uid, fn) {
  return this.request('get', '/queue/' + uid + '/', fn);
};

/**
 * List queue items
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Queue.prototype.list = function(options, fn) {
  return this.request('get', '/queue/', options, fn);
};

/**
 * Delete queue item
 *
 * @param {String} uid
 * @param {Function} callback
 * @api public
 */

Queue.prototype.del = function(uid, fn) {
  return this.request('delete', '/queue/' + uid + '/', fn);
};

/**
 * Delete all queue items
 *
 * @param {Function} callback
 * @api public
 */

Queue.prototype.deleteAll = function(fn) {
  return this.request('delete', '/queue/', fn);
};

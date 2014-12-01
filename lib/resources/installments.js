
/**
 * Module dependencies
 */

var util = require('util');
var Resource = require('./');

/**
 * Expose constructor
 */

module.exports = Installments;

/**
 * Installments constructor
 */

function Installments(mango) {
  Resource.call(this, mango);
}

util.inherits(Installments, Resource);

/**
 * List installments
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

Installments.prototype.list = function(options, fn) {
  return this.request('get', '/installments/', options, fn);
};

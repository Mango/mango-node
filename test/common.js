
/**
 * Expose should
 */

global.assert = require('better-assert');

/**
 * Expose env public key
 */
global.PUBLIC_KEY = process.env.MANGO_PUBLIC_TEST_KEY;

/**
 * Expose Mango
 */

global.Mango = require('../');
global.mango = Mango({ api_key: process.env.MANGO_SECRET_TEST_KEY });

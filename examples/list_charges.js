
/**
 * Module dependencies
 */

var mango = require('../')({ 'api_key': process.env.MANGO_SECRET_TEST_KEY });

/**
 * List charges
 */
mango.Charges.list(function(err, charges){
  if(err) {
    console.error(err); // Handle error
  } else {
    console.log(charges); // Response
  }
});


/**
 * Module dependencies
 */

var request = require('superagent');

/**
 * Aux function to create promotions generation requirements
 */

describe('Promotions', function(){

  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Promotions instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['get', 'list'].forEach(function(method){
        assert('function' == typeof mango.Promotions[method]);
      });
    });
  });

  describe('#get', function(){
    it('Get a promotion', function(done){
      mango.Promotions.list({'status': 'active'}, function(err, data){
        mango.Promotions.get(data[0].uid, function(err, promotion){
          assert('object' == typeof promotion);
          assert(promotion.status === 'active');
          assert(promotion.live === false);
          done(err);
        });
      });
    });
  });

  describe('#list', function(){
    it('List promotions', function(done){
      mango.Promotions.list({'status': 'active'}, function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert(data[0].status === 'active');
        assert(!data[0].live);
        done(err);
      });
    });
  });

});

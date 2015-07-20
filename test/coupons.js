
/**
 * Module dependencies
 */

var request = require('superagent');

describe('Coupons', function(){
  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Coupons instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['get', 'list', 'create', 'update'].forEach(function(method){
        assert('function' == typeof mango.Coupons[method]);
      });
    });
  });

  describe('#get', function(){
    it('Return error for bad uid', function(done){
      mango.Coupons.get('not_coupon', function(err, data){
        assert(err);
        assert(err.status === 404);
        done();
      });
    });

    it('Get a coupon', function(done){
      mango.Coupons.create({ 
        'amount': 2000,
        'type':'pagofacil',
        'first_due_date': new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
        'second_due_date': new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
        'surcharge': 20
      },function(err, data){
        mango.Coupons.get(data.uid, function(err, coupon){
          assert('object' == typeof coupon);
          assert(coupon.amount === 2000);
          assert(coupon.type === 'pagofacil');
          done(err);
        });
      });
    });
  });

  describe('#list', function(){
    it('List coupons', function(done){
      mango.Coupons.list(function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert(data[0].amount);
        assert(data[0].uid);
        done(err);
      });
    });
  });

  describe('#create', function(){
    it('Create coupon', function(done){
      mango.Coupons.create({ 
        'amount': 3000,
        'type':'rapipago',
        'first_due_date': new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString().split('T')[0],
        'second_due_date': new Date(Date.now() + 1000 * 60 * 60 * 24 * 70).toISOString().split('T')[0],
        'surcharge': 200
      },function(err, coupon){
        assert('object' == typeof coupon);
        assert(coupon.amount === 3000);
        assert(coupon.surcharge === 200);
        assert(coupon.type === 'rapipago');
        done(err);
      });
    });
  });

  describe('#update', function(){
    it('Update coupon', function(done){
      mango.Coupons.create({ 
        'amount': 3000,
        'type':'rapipago',
        'first_due_date': new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString().split('T')[0],
        'second_due_date': new Date(Date.now() + 1000 * 60 * 60 * 24 * 70).toISOString().split('T')[0],
        'surcharge': 200
      },function(err, coupon){
        assert(coupon.paid === false);
        mango.Coupons.update(coupon.uid, {
          'paid': true
        }, function(err, updatedCoupon){
          assert(updatedCoupon.paid === true);
          done(err);
        });
      });
    });
  });
});


/**
 * Module dependencies
 */

var request = require('superagent');

/**
 * Aux function to create refunds generation requirements
 */

function createRefundRequirements(fn) {
  request
  .post('https://api.getmango.com/v1/tokens/')
  .auth(PUBLIC_KEY, '').
  send({
    'number': '4507990000000010',
    'exp_month': '12',
    'exp_year': '2020',
    'holdername': 'John Doe',
    'type': 'visa',
    'ccv': '123'
  })
  .end(function(res){
    if(res.ok) {
      mango.Charges.create({
        'token': res.body.uid,
        'email': 'test-mangonode@example.org',
        'amount': 2000
      }, fn);
    } else {
      fn(res.error);
    }
  });
}

describe('Refunds', function(){

  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Refunds instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['get', 'list', 'create'].forEach(function(method){
        assert('function' == typeof mango.Refunds[method]);
      });
    });
  });

  describe('#get', function(){
    it('Return error for bad uid', function(done){
      mango.Charges.get('not_refund', function(err, data){
        assert(err);
        assert(err.status === 404);
        done();
      });
    });

    it('Get a refund', function(done){
      createRefundRequirements(function(err, charge){
        assert(!err);
        assert(charge.uid);
        mango.Refunds.create({ 'charge': charge.uid },function(err, data){
          mango.Refunds.get(data.uid, function(err, refund){
            assert('object' == typeof refund);
            assert(refund.refund_type === 'full');
            assert(refund.live === false);
            done(err);
          });
        });
      });
    });
  });

  describe('#list', function(){
    it('List refunds', function(done){
      mango.Refunds.list(function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert(data[0].refund_type === 'full');
        assert(!data[0].live);
        done(err);
      });
    });
  });

  describe('#create', function(){
    it('Create Refund', function(done){
      createRefundRequirements(function(err, charge){
        mango.Refunds.create({ 'charge': charge.uid},function(err, refund){
          assert('object' == typeof refund);
          assert(refund.refund_type === 'full');
          assert(!refund.live);
          done(err);
        });
      });
    });
  });

});

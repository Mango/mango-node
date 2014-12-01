
/**
 * Module dependencies
 */

var request = require('superagent');

/**
 * Aux function to create charge generation requirements
 */

function createChargeRequirements(fn) {
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
      fn(null, res.body);
    } else {
      fn(res.error);
    }
  });
}

describe('Charges', function(){

  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Charges instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['get', 'list', 'create'].forEach(function(method){
        assert('function' == typeof mango.Charges[method]);
      });
    });
  });

  describe('#get', function(){
    it('Return error for bad uid', function(done){
      mango.Charges.get('not_charge', function(err, data){
        assert(err);
        assert(err.status === 404);
        done();
      });
    });

    it('Get a charge', function(done){
      createChargeRequirements(function(err, token){
        assert(!err);
        assert(token.uid);
        mango.Charges.create({ 
          'token': token.uid,
          'amount': 2000,
          'email': 'test-mangonode@example.org' 
        },function(err, data){
          mango.Charges.get(data.uid, function(err, charge){
            assert('object' == typeof charge);
            assert(charge.amount === 2000);
            assert(charge.email === 'test-mangonode@example.org');
            done(err);
          });
        });
      });
    });
  });

  describe('#list', function(){
    it('List charges', function(done){
      mango.Charges.list(function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert(data[0].amount);
        assert(data[0].uid);
        done(err);
      });
    });
  });

  describe('#create', function(){
    it('Create charge', function(done){
      createChargeRequirements(function(err, token){
        mango.Charges.create({ 
          'token': token.uid,
          'amount': 2000,
          'email': 'test-mangonode@example.org' 
        },function(err, charge){
          assert('object' == typeof charge);
          assert(charge.amount === 2000);
          assert(charge.email === 'test-mangonode@example.org');
          done(err);
        });
      });
    });
  });

});

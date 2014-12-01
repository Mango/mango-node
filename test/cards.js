
/**
 * Module dependencies
 */

var request = require('superagent');

/**
 * Aux function to create card generation requirements
 */

function createCardRequirements(fn) {
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
      mango.Customers.create({'email': 'test-mangonode@example.org'}, function(err, data){
        if(err) {
          fn(err);
        } else {
          fn(null, {
            'customer': data.uid,
            'token': res.body.uid
          });
        }
      });
    } else {
      fn(res.error);
    }
  });
}

/**
 * Aux function to create ccv token
 */

function createCcvToken(fn) {
  request
  .post('https://api.getmango.com/v1/ccvs/')
  .auth(PUBLIC_KEY, '').
  send({
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

describe('Cards', function(){

  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Cards instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['get', 'list', 'create', 'update', 'del'].forEach(function(method){
        assert('function' == typeof mango.Cards[method]);
      });
    });
  });

  describe('#get', function(){
    it('Return error for bad uid', function(done){
      mango.Cards.get('not_card', function(err, data){
        assert(err);
        assert(err.status === 404);
        done();
      });
    });

    it('Get a card', function(done){
      createCardRequirements(function(err, input){
        assert(!err);
        mango.Cards.create(input, function(err, data){
          assert(!err);
          assert(data.uid);
          mango.Cards.get(data.uid, function(err, card){
            assert('object' == typeof card);
            assert('string' == typeof card.uid);
            assert(card.last4 === '0010');
            done(err);
          });
        });
      });
    });
  });

  describe('#list', function(){
    it('List cards', function(done){
      mango.Cards.list(function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert('string' == typeof data[0].last4);
        assert('object' == typeof data[0].customer);
        done(err);
      });
    });
  });

  describe('#create', function(){
    it('Create card', function(done){
      createCardRequirements(function(err, input){
        assert(!err);
        mango.Cards.create(input, function(err, card){
          assert(!err);
          assert('object' == typeof card);
          assert('string' == typeof card.uid);
          assert(card.last4 === '0010');
          done(err);
        });
      });
    });
  });

  describe('#update', function(){
    it('Update card', function(done){
      mango.Cards.list(function(err, list_data){
        createCcvToken(function(err, data) {
          mango.Cards.update(list_data[0].uid, {'ccv': data.uid}, done);
        });
      });
    });
  });

  describe('#del', function(){
    it('Delete card', function(done){
      mango.Cards.list(function(err, list_data){
        mango.Cards.del(list_data[0].uid, done);
      });
    });
  });

});


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


describe('Queue', function(){

  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Queue instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['get', 'list', 'del', 'deleteAll'].forEach(function(method){
        assert('function' == typeof mango.Queue[method]);
      });
    });
  });

  describe('#get', function(){
    it('Return error for bad uid', function(done){
      mango.Queue.get('not_charge', function(err, data){
        assert(err);
        assert(err.status === 404);
        done();
      });
    });

    it('Get a queue item', function(done){
      createChargeRequirements(function(err, token){
        assert(!err);
        assert(token.uid);
        mango.Charges.create({ 
          'token': token.uid,
          'amount': 2000,
          'email': 'test-mangonode@example.org',
          'enqueue': true
        },function(err, data){
          mango.Queue.get(data.queue, function(err, item){
            assert('object' == typeof item);
            assert(item.resource_type === 'charge');
            assert(item.status === 'pending');
            done(err);
          });
        });
      });
    });
  });

  describe('#list', function(){
    it('List queue items', function(done){
      mango.Queue.list(function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert(data[0].resource_type);
        assert(data[0].status);
        done(err);
      });
    });
  });

  describe('#del', function(){
    it('Delete Queue item', function(done){
      mango.Queue.list(function(err, data){
        mango.Queue.del(data[0].uid, done);
      });
    });
  });

  describe('#deleteAll', function(){
    it('Delete all Queue items', function(done){
      mango.Queue.deleteAll(done);
    });
  });

});

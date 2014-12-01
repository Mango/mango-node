
describe('Customers', function(){

  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Customers instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['get', 'list', 'create', 'update', 'del'].forEach(function(method){
        assert('function' == typeof mango.Customers[method]);
      });
    });
  });

  describe('#get', function(){
    it('Return error for bad uid', function(done){
      mango.Customers.get('not_customer', function(err, data){
        assert(err);
        assert(err.status === 404);
        done();
      });
    });

    it('Get a customer', function(done){
      mango.Customers.create({'email': 'test-mangonode@example.org'}, function(err, data){
        assert(!err);
        assert(data.uid);
        mango.Customers.get(data.uid, function(err, customer){
          assert('object' == typeof customer);
          assert('string' == typeof customer.uid);
          assert(customer.email === 'test-mangonode@example.org');
          done(err);
        });
      });
    });
  });

  describe('#list', function(){
    it('List customers', function(done){
      mango.Customers.list(function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert(data[0].email);
        assert(data[0].uid);
        done(err);
      });
    });
  });

  describe('#create', function(){
    it('Create customer', function(done){
      mango.Customers.create({'email': 'test-mangonode@example.org'}, function(err, data){
        assert('object' == typeof data);
        assert(data.uid);
        assert(data.email === 'test-mangonode@example.org');
        done(err);
      });
    });
  });

  describe('#update', function(){
    it('Update customer', function(done){
      mango.Customers.list(function(err, list_data){
        var rand = Math.floor(Math.random() * 100);
        mango.Customers.update(list_data[0].uid, {'name': 'test mango-node ' + rand}, function(err, data){
          assert(data.uid === list_data[0].uid);
          assert(data.email === list_data[0].email);
          assert(data.name === 'test mango-node ' + rand);
          done(err);
        });
      });
    });
  });

  describe('#del', function(){
    it('Delete customer', function(done){
      mango.Customers.list(function(err, list_data){
        mango.Customers.del(list_data[0].uid, done);
      });
    });
  });

});

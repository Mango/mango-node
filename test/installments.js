
describe('Installments', function(){

  describe('base', function(){
    it('Inherits from Resource', function(){
      assert(mango.Installments instanceof require('../lib/resources'));
    });

    it('Has all required methods', function(){
      ['list'].forEach(function(method){
        assert('function' == typeof mango.Installments[method]);
      });
    });
  });

  describe('#list', function(){
    it('List installments', function(done){
      mango.Installments.list(function(err, data){
        assert(Array.isArray(data));
        assert(data.length);
        assert(data[0].interest_rate);
        assert(data[0].installments);
        done(err);
      });
    });
  });

});

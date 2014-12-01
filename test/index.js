
describe('Mango', function(){
  describe('Constructor', function(){
    it('Refuse to initialize without an apikey', function(done){
      try {
        var mango = Mango();
      } catch(e) {
        assert(e);
        done();
      }
    });
  });

});

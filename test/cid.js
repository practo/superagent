var setup = require('./support/setup');
var uri = setup.uri;

var assert = require('assert');
var request = require('../');

describe('CID tests', function(){

  it('simple post request', function(done) {
    request
      .post(uri + '/echo')
      .send('name=user')
      .end(function(err, res) {
        assert(!!res.headers.cid, 'headers should have cid');
        done();
      });
  });

  it('simple get request', function(done) {
    request
      .get(uri + '/echo')
      .end(function(err, res) {
        assert(!!res.headers.cid, 'headers should have cid');
        done();
      });
  });

  it('request with noCid', function(done) {
    request
      .get(uri + '/echo')
      .noCid()
      .end(function(err, res) {
        assert(!!res.headers.cid === false, 'headers should not have cid');
        done();
      });
  });

  it('request with custom cid', function(done) {
    request
      .get(uri + '/echo')
      .setCid('112299')
      .end(function(err, res) {
        assert(res.headers.cid === '112299', 'should have the same cid');
        done();
      });
  });

  it('mutate headers with cid', function() {
    var heads = {'user-agent': 'browser', 'content-type': 'json'};
    request.mutateWithCid(heads);
    assert(!!heads.Cid, 'headers should have cid');
  });

  it('no change mutation', function() {
    var heads = {'user-agent': 'browser', 'content-type': 'json', 'cid': '112'};
    request.mutateWithCid(heads);
    assert(heads.cid === '112', 'cid should be same');
  });

  it('extract cid from headers', function() {
    var heads = {'cid': '101a'};
    assert(request.extractCid(heads) === '101a', 'cid should be same');
    heads = {'Cid': '101c'};
    assert(request.extractCid(heads) === '101c', 'Cid should be same');
    heads = {'user-agent': 'browser'};
    assert(!!request.extractCid(heads), 'cid should exists');
  });

});

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
});

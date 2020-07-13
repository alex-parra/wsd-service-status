'use strict';

const getStatusClass = require('./getStatusClass');
const assert = require('assert');

describe('getStatusClass', function() {
  it('returns success with < 300', function() {
    assert.equal(getStatusClass(200), 'badge-success');
    assert.equal(getStatusClass(201), 'badge-success');
    assert.equal(getStatusClass(299), 'badge-success');
  });

  it('returns warning with >= 400', function() {
    assert.equal(getStatusClass(400), 'badge-warning');
    assert.equal(getStatusClass(404), 'badge-warning');
    assert.equal(getStatusClass(409), 'badge-warning');
    assert.equal(getStatusClass(499), 'badge-warning');
  });

  it('returns danger with >= 500', function() {
    assert.equal(getStatusClass(500), 'badge-danger');
    assert.equal(getStatusClass(501), 'badge-danger');
    assert.equal(getStatusClass(502), 'badge-danger');
  });
});

'use strict';

const getAlertsClass = require('./getAlertsClass');
const assert = require('assert');

describe('getAlertsClass', function() {
  it('returns success with 0 alerts', function() {
    assert.equal(getAlertsClass(0, 5), 'badge-success');
    assert.equal(getAlertsClass(0, 0), 'badge-success');
    assert.equal(getAlertsClass(0, 1), 'badge-success');
  });

  it('returns warning with more than half the max alerts', function() {
    assert.equal(getAlertsClass(3, 5), 'badge-warning');
    assert.equal(getAlertsClass(5, 10), 'badge-warning');
    assert.equal(getAlertsClass(6, 10), 'badge-warning');
  });

  it('returns danger when near max alerts', function() {
    assert.equal(getAlertsClass(5, 5), 'badge-danger');
    assert.equal(getAlertsClass(4, 5), 'badge-danger');
    assert.equal(getAlertsClass(3, 5), 'badge-warning');
  });
});

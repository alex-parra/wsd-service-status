/* global c3 */
'use strict';

function nodesChart(healthy, errored) {
  c3.generate({
    bindto: $('[data-role=nodesHealth]').get(0),
    data: {
      columns: [['With errors', errored], ['Healthy', healthy]],
      colors: { 'With errors': '#dc3545', Healthy: '#28a745' },
      type: 'donut',
    },
    donut: {
      title: 'Nodes',
      width: 25,
      label: {
        format: function(value) {
          return value;
        },
      },
    },
  });
}

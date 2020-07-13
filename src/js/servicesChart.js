/* global c3 */
'use strict';

function servicesChart(healthy, errored) {
  c3.generate({
    bindto: $('[data-role=servicesHealth]').get(0),
    data: {
      columns: [['With errors', errored], ['Healthy', healthy]],
      colors: { 'With errors': '#dc3545', Healthy: '#28a745' },
      type: 'donut',
    },
    donut: {
      title: 'Services',
      width: 25,
      label: {
        format: function(value) {
          return value;
        },
      },
    },
  });
}

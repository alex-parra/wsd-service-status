'use strict';

function getAlertsClass(alertsCount, max = alertsCount, prefix = 'badge') {
  let alertsClass = 'info';

  if (alertsCount < 1) alertsClass = 'success';
  else if (alertsCount >= max - 1) alertsClass = 'danger';
  else if (alertsCount >= max / 2) alertsClass = 'warning';

  return prefix + '-' + alertsClass;
}

if (typeof module !== 'undefined') module.exports = getAlertsClass;

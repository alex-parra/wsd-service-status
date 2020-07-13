'use strict';

function getStatusClass(status, prefix = 'badge') {
  let statusClass = 'info';

  if (status >= 500) statusClass = 'danger';
  else if (status >= 400) statusClass = 'warning';
  else if (status < 300) statusClass = 'success';

  return prefix + '-' + statusClass;
}

if (typeof module !== 'undefined') module.exports = getStatusClass;

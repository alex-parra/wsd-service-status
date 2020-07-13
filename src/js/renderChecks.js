'use strict';

function renderChecks(checks = [], checkTemplate = '') {
  if (checks.length === 0) return '<li class="no-results">No checks to list.</li>';

  const checksHtml = checks.map(function(check) {
    let checkHtml = checkTemplate;
    checkHtml = checkHtml.replace('NODE_CHECK_NAME', check.name);
    checkHtml = checkHtml.replace('NODE_CHECK_MESSAGE', check.message);
    checkHtml = checkHtml.replace('NODE_CHECK_STATE', check.state);
    return checkHtml;
  });

  return checksHtml.join('');
}

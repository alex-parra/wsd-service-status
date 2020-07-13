/* global renderChecks, getStatusClass */
'use strict';

function renderNodes(nodes = [], nodeTemplate = '', checkTemplate = '') {
  if (nodes.length === 0) return '<li class="no-results">No nodes to list.</li>';

  const nodesHtml = nodes.map(function(node) {
    let nodeHtml = nodeTemplate;
    nodeHtml = nodeHtml.replace('NODE_NAME', node.web_node);
    nodeHtml = nodeHtml.replace('NODE_STATUS_CODE', node.status_code);
    nodeHtml = nodeHtml.replace('NODE_STATUS_CLASS', getStatusClass(node.status_code));

    const checks = node.checks || [];
    const checksHtml = renderChecks(checks, checkTemplate);
    nodeHtml = nodeHtml.replace('NODE_CHECKS', checksHtml);
    return nodeHtml;
  });

  return nodesHtml.join('');
}

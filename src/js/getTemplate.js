'use strict';

function getTemplate(templateId) {
  const tmpl = jQuery('#' + templateId);
  !tmpl.length && console.error('Template not found:', templateId);
  return tmpl.length ? tmpl.html().trim() : '';
}

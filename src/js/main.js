/* global dateFormat, getTemplate, renderNodes, getStatusClass, getAlertsClass, servicesChart, nodesChart */

'use strict';

(function($) {
  const $doc = $(document);

  const state = {
    search: '',
  };

  function getReport() {
    return new Promise(function(resolve, reject) {
      $.ajax('/report', {
        method: 'GET',
        success: resolve,
        error: reject,
      });
    });
  }

  function setReport(report) {
    report.service_reports.sort(function(a, b) {
      return b.total_alerts + b.nodes.length - (a.total_alerts + a.nodes.length);
    });

    report.servicesHealthy = 0;
    report.servicesErrored = 0;
    report.nodesHealthy = 0;
    report.nodesErrored = 0;
    report.totalNodes = 0;
    report.service_reports.forEach(function(service) {
      if (service.total_alerts > 0) report.servicesErrored += 1;
      else report.servicesHealthy += 1;

      const nodes = service.nodes || [];
      report.totalNodes += nodes.length;
      report.nodesHealthy += nodes.filter(function(node) {
        return node.total_alerts === 0;
      }).length;
      report.nodesErrored += nodes.filter(function(node) {
        return node.total_alerts > 0;
      }).length;

      service.max_alerts = nodes.reduce(function(acc, node) {
        const checks = node.checks || [];
        return acc + checks.length;
      }, 0);
      if (service.max_alerts === 0) service.max_alerts = nodes.length;
    });

    state.report = report;
  }

  function getServiceByHostId(hostId) {
    return state.report.service_reports.find(function(s) {
      return s.host.id === Number(hostId);
    });
  }

  let renderReportTimeout = null;
  function renderReport() {
    if (renderReportTimeout) clearTimeout(renderReportTimeout);
    renderReportTimeout = setTimeout(function() {
      const report = state.report;
      $('[data-role=reportId]').text(report.job_id);
      $('[data-role=reportDate]').text(dateFormat(new Date(report.completed_at)));

      // Stats
      $('[data-role=servicesCount]').text(report.service_reports.length);
      servicesChart(report.servicesHealthy, report.servicesErrored);
      $('[data-role=nodesCount]').text(report.totalNodes);
      nodesChart(report.nodesHealthy, report.nodesErrored);
      $('[data-role=alertsCount]').text(report.total_alerts);

      const serviceCardHtml = getTemplate('serviceCard');
      const rx = state.search ? new RegExp(state.search, 'i') : null;
      const servicesHtml = report.service_reports.map(function(service) {
        if (rx && !rx.test(service.host.name)) return;

        let li = serviceCardHtml;
        li = li.replace('HOST_NAME', service.host.name);
        li = li.replace('ALERTS_COUNT', service.total_alerts);
        li = li.replace('ALERTS_CLASS', getAlertsClass(service.total_alerts, service.max_alerts));
        li = li.replace('STATUS_CODE', service.status_code);
        li = li.replace('STATUS_CLASS', getStatusClass(service.status_code));
        li = li.replace('STATUS_TEXT', service.status_text);

        return $(li).data('service', service.host.id);
      });

      $('[data-role=services]').html(servicesHtml);
    }, 500);
  }

  // Services Search
  $doc.on('keyup', '[data-role=filter-services]', function(ev) {
    state.search = ev.target.value;
    renderReport();
  });

  // Service Detail Modal
  const serviceModal = $('.service-modal').modal({ show: false });
  const serviceModalHtml = getTemplate('serviceModal');
  const serviceModalNodeHtml = getTemplate('serviceModalNode');
  const serviceModalNodeCheckHtml = getTemplate('serviceModalNodeCheck');
  $doc.on('click', '[data-role=service-card]', function() {
    const hostId = $(this).data('service');
    const service = getServiceByHostId(hostId);

    let modal = serviceModalHtml;
    modal = modal.replace('HOST_NAME', service.host.name);
    modal = modal.replace('STATUS_CODE', service.status_code);
    modal = modal.replace('STATUS_CLASS', getStatusClass(service.status_code));
    modal = modal.replace('STATUS_TEXT', service.status_text);
    const nodesHtml = renderNodes(service.nodes, serviceModalNodeHtml, serviceModalNodeCheckHtml);
    modal = modal.replace('SERVICE_NODES', nodesHtml);

    serviceModal.find('.modal-body').html(modal);
    serviceModal.modal('show');
  });

  // Initial Render
  $doc.ready(function() {
    getReport()
      .then(setReport)
      .then(renderReport)
      .catch(console.error);
  });
})(jQuery);

/*
 * SentinelDesk webhook: ServiceNow Business Rule
 *
 *   Table:  Incident [incident]
 *   When:   after    Insert: checked    Advanced: checked
 *   Filter: State is New
 *
 * System properties (sys_properties.list), both type "string":
 *   sentineldesk.endpoint        https://<your-api-host>/api/ingest/servicenow
 *   sentineldesk.webhook_secret  same value as SN_WEBHOOK_SECRET on the server (mark "Private")
 *
 * Sends only the sys_id and number. SentinelDesk fetches the incident itself over the Table API,
 * then writes its triage back as a work note starting with "[SentinelDesk AI triage]".
 *
 * Signature: HMAC-SHA256(secret, "<unix seconds>.<exact body>"), base64, in
 * X-SentinelDesk-Signature: sha256=<base64>, with the timestamp in X-SentinelDesk-Timestamp.
 * GlideCertificateEncryption.generateMac takes a base64-encoded key and returns base64.
 */
(function executeRule(current, previous /* null on insert */) {
  var endpoint = gs.getProperty('sentineldesk.endpoint');
  var secret = gs.getProperty('sentineldesk.webhook_secret');
  if (!endpoint || !secret) {
    gs.warn('SentinelDesk: set sentineldesk.endpoint and sentineldesk.webhook_secret to enable triage webhooks.');
    return;
  }

  var body = JSON.stringify({ sys_id: current.getUniqueValue(), number: current.getValue('number') });
  var timestamp = String(Math.floor(new GlideDateTime().getNumericValue() / 1000));
  var mac = new GlideCertificateEncryption().generateMac(GlideStringUtil.base64Encode(secret), 'HmacSHA256', timestamp + '.' + body);

  var request = new sn_ws.RESTMessageV2();
  request.setEndpoint(endpoint);
  request.setHttpMethod('post');
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('X-SentinelDesk-Timestamp', timestamp);
  request.setRequestHeader('X-SentinelDesk-Signature', 'sha256=' + mac);
  request.setRequestBody(body);
  request.setHttpTimeout(10000);

  try {
    // Async: incident creation never waits on SentinelDesk. Delivery failures are logged by the
    // outbound HTTP log; the server's poller (SN_POLL_INTERVAL_SEC) picks up anything missed.
    request.executeAsync();
  } catch (e) {
    gs.error('SentinelDesk webhook for ' + current.getValue('number') + ' failed: ' + e.message);
  }
})(current, previous);

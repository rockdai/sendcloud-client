/*!
 * sendcloud-client - lib/client.js
 */

'use strict';

/**
 * Module dependencies.
 */
const ms = require('humanize-ms');
const assert = require('assert');
const urllib = require('urllib');

const DEFAULT_TIMEOUT = ms('5s');

class SendCloud {
  constructor(options) {
    this.API_BASE = 'http://api.sendcloud.net/apiv2';
    this.options = Object.assign({}, { timeout: DEFAULT_TIMEOUT }, options);
  }

  * request(method, url, data) {
    const reqData = Object.assign({}, data, {
      apiUser: this.options.apiUser,
      apiKey: this.options.apiKey,
      from: this.options.from,
    });
    const res = yield urllib.requestThunk(url, {
      method,
      data: reqData,
      dataType: 'json',
      timeout: this.options.timeout,
    });
    return res.data;
  }

  * send(data) {
    const URL = `${this.API_BASE}/mail/send`;
    data = data || {};

    if (Array.isArray(data.to)) {
      data.to = data.to.join(';');
    }
    return yield this.request('POST', URL, data);
  }

  * sendTemplate(data) {
    const URL = `${this.API_BASE}/mail/sendtemplate`;
    data = data || {};

    if (Array.isArray(data.to)) {
      data.to = data.to.join(';');
    }
    if (typeof data.xsmtpapi === 'object') {
      data.xsmtpapi = JSON.stringify(data.xsmtpapi);
    }

    return yield this.request('POST', URL, data);
  }
}

module.exports = SendCloud;

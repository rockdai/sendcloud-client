/*!
 * sendcloud-client - lib/client.js
 */

'use strict';

/**
 * Module dependencies.
 */
const urllib = require('urllib');
const util = require('util');

const DEFAULT_TIMEOUT = 3600000;
const API_BASE = 'http://sendcloud.sohu.com/webapi';

function SendCloud(options) {
  if (!options || !options.apiUser || !options.apiKey || !options.from) {
    throw new TypeError('required apiUser, apiKey and from');
  }
  options.timeout = options.timeout || DEFAULT_TIMEOUT;
  this.options = options;
}

SendCloud.create = function create(options) {
  return new SendCloud(options);
};

SendCloud.prototype._request = function (url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {
      dataType: 'json'
    };
  }
  // use global default timeout if options.timeout not set.
  options.timeout = options.timeout || this.options.timeout;
  urllib.request(url, options, function (err, data, res) {
    if (err) {
      err.name = 'SendCloudRequestError';
      return callback(err, data, res);
    }
    callback(null, data, res);
  });
};

SendCloud.prototype.send = function (options, callback) {
  const url = API_BASE + '/mail.send.json';
  options = options || {};
  if (!options.to || !options.subject || !options.html) {
    return callback(new TypeError('required to, subject and html'));
  }
  if (util.isArray(options.to)) {
    options.to = options.to.join(';');
  }
  let reqData = options;
  reqData.api_user = this.options.apiUser;
  reqData.api_key = this.options.apiKey;
  reqData.from = this.options.from;
  let reqOptions = {
    method: 'POST',
    dataType: 'json',
    timeout: options.timeout,
    data: reqData,
  };
  return this._request(url, reqOptions, callback);
};

module.exports = SendCloud;

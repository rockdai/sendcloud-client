/*!
 * sendcloud-client - lib/client.js
 */

'use strict';

/**
 * Module dependencies.
 */

const urllib = require('urllib');

const DEFAULT_TIMEOUT = 3600000;
const API_BASE = 'http://sendcloud.sohu.com/webapi';

function SendCloud(options) {
  if (!options || !options.apiUser || !options.apiKey) {
    throw new TypeError('required apiUser and apiKey');
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
    err = utils.handleResponse(err, data, res);
    if (err) {
      return callback(err, data, res);
    }
    callback(null, data, res);
  });
};

module.exports = Qiniu;

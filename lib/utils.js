/*!
 * sendcloud-client - lib/utils.js
 */

'use strict';

/**
 * Module dependencies.
 */

const utility = require('utility');

exports.handleResponse = function (err, data, res) {
  if (err) {
    return err;
  }
  const statusCode = res.statusCode;
  // if (statusCode >= 400) {
  //   err = exports.createError(statusCode, data);
  //   return err;
  // }
};

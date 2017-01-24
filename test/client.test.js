/**!
 * sendcloud-client - test/client.test.js
 */

'use strict';

/**
 * Module dependencies.
 */
const config = require('./config');
const assert = require('assert');
const co = require('co');
const SendCloud = require('../');

describe('test/client.test.js', function() {

  describe('#send', function() {
    it('should return false when invalid config', function(done) {
      co(function* () {
        const client = new SendCloud({
          from: 'service@sendcloud.im',
          apiUser: 'invalid_api_user',
          apiKey: 'invalid_api_key'
        });
        const options = {
          to: 'nobody@rockdai.com',
          subject: '[sendcloud-client] 测试发送',
          html: '太棒了！成功的从SendCloud发送了一封测试邮件！'
        };
        const res = yield client.send(options);
        assert(res.result === false);
        assert(res.statusCode === 40005);
        done();
      });
    });
    it('should throw error when request error', function(done) {
      co(function* () {
        const client = new SendCloud({
          from: config.from,
          apiUser: config.apiUser,
          apiKey: config.apiKey,
          timeout: 1
        });
        const options = {
          to: 'nobody@rockdai.com',
          subject: '[sendcloud-client] 测试发送',
          html: '太棒了！成功的从SendCloud发送了一封测试邮件！'
        };
        yield client.send(options);
      }).catch(err => {
        assert(err.name === 'ConnectionTimeoutError');
        done();
      });
    });
    it('should work', function(done) {
      co(function* () {
        const client = new SendCloud(config);
        const options = {
          to: [ 'rockdai@qq.com' ],
          subject: '[sendcloud-client] 测试发送',
          html: '太棒了！成功的从SendCloud发送了一封测试邮件！'
        };
        const res = yield client.send(options);
        assert(res.result === true);
        assert(res.statusCode === 200);
        done();
      });
    });
  });

  describe('#sendTemplate', function() {
    it('should handle mailing address', function(done) {
      co(function* () {
        const client = new SendCloud(config);
        const options = {
          useAddressList: true,
          to: 'nobody@rockdai.com',
          subject: '[sendcloud-client] 测试发送模板',
        };
        const res = yield client.sendTemplate(options);
        assert(res.result === false);
        assert(res.statusCode === 40863);
        done();
      });
    });
    it('should work', function(done) {
      co(function* () {
        const client = new SendCloud(config);
        const options = {
          subject: '[sendcloud-client] 测试发送模板',
          templateInvokeName: 'birdman_verify',
          xsmtpapi: {
            to: [ 'nobody@rockdai.com', 'nobody2@rockdai.com' ],
            sub: {
              '%link_verify%': [ 'link0', 'link1' ],
            },
          },
        };
        const res = yield client.sendTemplate(options);
        assert(res.result === true);
        assert(res.statusCode === 200);
        done();
      });
    });
  });
});

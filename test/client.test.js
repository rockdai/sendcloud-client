/**!
 * sendcloud-client - test/client.test.js
 */

'use strict';

/**
 * Module dependencies.
 */
const config = require('./config');
const should = require('should');
const SendCloud = require('../');

describe('client.test.js', function () {
  it('should throw TypeError', function () {
    (function () {
      SendCloud.create();
    }).should.throw('required apiUser, apiKey and from');
    (function () {
      SendCloud.create({});
    }).should.throw('required apiUser, apiKey and from');
    (function () {
      SendCloud.create({apiUser: 'apiUser', apiKey: 'apiKey'});
    }).should.throw('required apiUser, apiKey and from');
  });

  describe('send()', function () {
    let client;
    before(function () {
      client = SendCloud.create(config);
    });
    it('should callback with TypeError', function () {
      (function () {
        client.send(undefined);
      }).should.throw('required to, subject and html');
      (function () {
        client.send({});
      }).should.throw('required to, subject and html');
      (function () {
        client.send({to: 'to', subject: 'subject'});
      }).should.throw('required to, subject and html');
    });
    it('should error when invalid config', function () {
      let client = SendCloud.create({
        from: 'service@sendcloud.im',
        apiUser: 'invalid_api_user',
        apiKey: 'invalid_api_key'
      });
      let options = {
        to: 'nobody@rockdai.com',
        subject: '来自sendcloud-client的一封邮件！',
        html: '太棒了！成功的从SendCloud发送了一封测试邮件！'
      };
      let res = client.send(options);
      res.message.should.equal('error');
    });
    it('should error when request error', function () {
      let client = SendCloud.create({
        from: config.from,
        apiUser: config.apiUser,
        apiKey: config.apiKey,
        timeout: 1
      });
      let options = {
        to: 'nobody@rockdai.com',
        subject: '来自sendcloud-client的一封邮件！',
        html: '太棒了！成功的从SendCloud发送了一封测试邮件！'
      };
      try {
        client.send(options);
      } catch (ex) {
        ex.should.be.an.Error;
        ex.name.should.equal('SendCloudRequestError');
      }
    });
    it('should error when mail content sample validate not match', function () {
      let options = {
        to: 'nobody@rockdai.com',
        subject: 'unittest',
        html: 'unittest mail body'
      };
      let res = client.send(options);
      res.message.should.equal('error');
    });
    it('should work', function () {
      let options = {
        to: ['nobody@rockdai.com'],
        subject: '来自sendcloud-client的一封邮件！',
        html: '太棒了！成功的从SendCloud发送了一封测试邮件！'
      };
      let res = client.send(options);
      res.message.should.equal('success');
    });
  });
});

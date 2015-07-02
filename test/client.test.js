/**!
 * sendcloud-client - test/client.test.js
 */

'use strict';

/**
 * Module dependencies.
 */
const config = require('./config.json');
const pedding = require('pedding');
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
    it('should callback with TypeError', function (done) {
      done = pedding(3, done);
      client.send(undefined, function (err) {
        err.message.should.equal('required to, subject and html');
        done();
      });
      client.send({}, function (err) {
        err.message.should.equal('required to, subject and html');
        done();
      });
      client.send({to: 'to', subject: 'subject'}, function (err) {
        err.message.should.equal('required to, subject and html');
        done();
      });
    });
    it('should error when invalid config', function (done) {
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
      client.send(options, function (err, result) {
        result.message.should.equal('error');
        done(err);
      });
    });
    it('should error when request error', function (done) {
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
      client.send(options, function (err, result) {
        err.should.be.an.Error;
        err.name.should.equal('SendCloudRequestError');
        done();
      });
    });
    it('should error when mail content sample validate not match', function (done) {
      let options = {
        to: 'nobody@rockdai.com',
        subject: 'unittest',
        html: 'unittest mail body'
      };
      client.send(options, function (err, result) {
        result.message.should.equal('error');
        done(err);
      });
    });
    it('should work', function (done) {
      let options = {
        to: 'nobody@rockdai.com',
        subject: '来自sendcloud-client的一封邮件！',
        html: '太棒了！成功的从SendCloud发送了一封测试邮件！'
      };
      client.send(options, function (err, result) {
        result.message.should.equal('success');
        done(err);
      });
    });
  });
});

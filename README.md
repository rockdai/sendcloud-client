sendcloud-client
=======

[![Build Status](https://travis-ci.org/rockdai/sendcloud-client.svg?branch=master)](https://travis-ci.org/rockdai/sendcloud-client)
[![Coverage Status](https://coveralls.io/repos/rockdai/sendcloud-client/badge.svg)](https://coveralls.io/r/rockdai/sendcloud-client)

Node.js client for http://sendcloud.sohu.com.

Support send mails in sync way.

## Install

```bash
$ npm install sendcloud-client
```

## Usage

### Init

```js
let SendCloud = require('sendcloud-client');

let client = SendCloud.create({
  from: 'mail from',
  apiUser: 'your api user',
  apiKey: 'your api key'
});
```

### Send

```js
// send mail
let options = {
  to: ['baijuyi@gmail.com', 'lishangyin@qq.com'],
  subject: '晚上来我家吃饭吧！',
  html: '老婆做了东坡肉，与大家一起分享！'
};

let res = client.send(options);
console.log(res);
// {
//     "message":"success",
//     "email_id_list":[
//         "1426053463570_15_32087_2059.sc-10_10_127_105-inbound0$ben@ifaxin.com",
//         "1426053463570_15_32087_2059.sc-10_10_127_105-inbound1$joe@ifaxin.com",
//         "1426053463570_15_32087_2059.sc-10_10_127_105-inbound2$bida@ifaxin.com",
//         "1426053463570_15_32087_2059.sc-10_10_127_105-inbound3$lianzimi@ifaxin.com"
//     ]
// }
```

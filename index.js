var bodyparser = require('body-parser'); //解析HTTP請求的中介軟體
var express = require('express');

var conf = require('./conf');
var functions = require('./functions');
var lots = require('./routes/parkingLots');

var app = express();

// 使用bodyparser.json()將HTTP請求方法 POST、DELETE、PUT和PATCH，放在HTTP主體(body); 發送的參數存放在req.body
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(functions.passwdCrypto);
app.use('/parking', lots);

app.listen(conf.port, function() {
  console.log('Example app listening on port ' + conf.port + ' !');
});
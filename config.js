var fs = require("fs");

var globalConfig = {};

var conf = fs.readFileSync('./server.conf');

var configArr = conf.toString().split("\n");

for(var i = 0; i < configArr.length; i ++){
    var temp = configArr[i].split('=');
    globalConfig[temp[0].trim()] = temp[1].trim();
}

module.exports = globalConfig;
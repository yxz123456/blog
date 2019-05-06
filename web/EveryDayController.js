const everyDayDao = require("../dao/EveryDayDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/respUtil");
var path = new Map();

function editEveryDay(request, response) {
    request.on('data', function(data){
        var content = JSON.parse(data.toString().trim());
        everyDayDao.insertEveryDay(content.content, timeUtil.getNow(), (res) => {
            console.log(res);
            response.writeHead(200);
            response.write(respUtil.writeRes('success','添加成功',null));
            response.end();
        })
    })
}

path.set("/editEveryDay", editEveryDay);

function queryEveryDay(request, response) {
    everyDayDao.queryEveryDay((res) => {
        response.writeHead(200);
        response.write(respUtil.writeRes('success','查询成功',res));
        response.end();
    })
}

path.set("/queryEveryDay", queryEveryDay);

module.exports.path = path;
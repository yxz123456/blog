const tagsDao = require("../dao/TagsDao");

const respUtil = require("../util/respUtil");
var path = new Map();

function queryRandomTag(request, response){
    tagsDao.queryRandomTag((res) => {
        res.sort(() => Math.random() - 0.5);
        response.send(respUtil.writeRes('success','查询成功',res));
        response.end();
    })
}

path.set("/queryRandomTag", queryRandomTag);

module.exports.path = path;
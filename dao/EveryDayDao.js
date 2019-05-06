const dbutil = require("./DBUtil");

//每日一句插入
function insertEveryDay(content, ctime, success) {
    let insertSql = "insert into every_day (`content`, `ctime`) values (?, ?)";
    let params = [content, ctime];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, res){
        if(err == null){
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}

//每日一句查询
function queryEveryDay(success) {
    let querySql = "select content from every_day order by id desc limit 1";
    let params = [];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, res){
        if(err == null){
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}
module.exports = {
    insertEveryDay,
    queryEveryDay
}
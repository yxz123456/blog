const dbutil = require("./DBUtil");

function insertTag(tag, ctime, utime, success) {
    var insertSql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)";
    var params = [tag, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryTag(tag, success) {
    var querySql = "select * from tags where tag = ?;";
    var params = [tag];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryRandomTag(success) {
    var querySql = "select * from tags order by rand() limit 20;";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
module.exports = {
    insertTag,
    queryTag,
    queryRandomTag
}
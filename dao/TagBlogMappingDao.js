const dbutil = require("./DBUtil");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)";
    var params = [tagId, blogId, ctime, utime];
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

function queryBlogByTagId(tagId, page, pageSize, success) {
    var insertSql = "select blog_id from tag_blog_mapping where tag_id = ? order by id desc limit ?, ?;";
    var params = [tagId, page * pageSize, pageSize - 0];
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

module.exports = {
    insertTagBlogMapping,
    queryBlogByTagId
}
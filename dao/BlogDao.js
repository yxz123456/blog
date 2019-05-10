const dbutil = require("./DBUtil");

//文章插入
function insertBlog(title, content, tags, viewCount, ctime, utime, success) {
    let insertSql = "insert into blog (`title`, `content`, `tags`, `viewCount`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    let params = [title, content, tags, viewCount, ctime, utime];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, res){
        if(err == null){
            console.log(res)
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}

//通过page查blog
function queryBlogByPage(page, pageSize, success) {
    let querySql = "select * from blog order by id desc limit ?, ?;";
    let params = [page * pageSize, pageSize-0];

    let connection = dbutil.createConnection();
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

//查blog总数
function queryBlogCount(success) {
    let querySql = "select count(1) as count from blog;";
    let params = [];

    let connection = dbutil.createConnection();
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

//通过id查blog
function queryBlogById(id,success) {
    let querySql = "select * from blog where id = ?;";
    let params = [id];

    let connection = dbutil.createConnection();
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

function queryAllBlog(success) {
    let querySql = "select * from blog;";
    let params = [];

    let connection = dbutil.createConnection();
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


function addViews(blogId, success) {
    let querySql = "update blog set viewCount = viewCount + 1 where id = ?;";
    let params = [blogId];

    let connection = dbutil.createConnection();
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

function queryHotBlog(success) {
    var querySql = "select * from blog order by viewCount desc limit 10;";
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
    insertBlog,
    queryBlogByPage,
    queryBlogCount,
    queryBlogById,
    queryAllBlog,
    addViews,
    queryHotBlog,
    // queryBlogCountByTagId
}
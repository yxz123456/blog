const commentDao = require("../dao/CommentDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/respUtil");
const url = require("url");
const captcha = require("svg-captcha");
var path = new Map();

function queryNewComments(request, response) {
    commentDao.queryNewComments(function (result) {
        response.send(respUtil.writeRes("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryNewComments", queryNewComments);

function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.blogId), function(result) {
        let parent = [];
        let children = [];
        result.forEach((val) => {
            if(val.parent == -1){
                parent.push(val);
            }
            else{
                children.push(val);
            }
        })
        children.forEach((val) => {
            parent.forEach((v) => {
                v.children = [];
                if(val.parent == v.id){
                    v.children.push(val);
                }
            })
        })
        response.writeHead(200);
        response.write(respUtil.writeRes("success", "评论成功", parent));
        response.end();
    });
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryCommentsCountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentCountByBlogId(parseInt(params.blogId), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeRes("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

function addComment(request, response){
    request.on('data', function(data){
        var content = JSON.parse(data.toString());
        console.log(content);
        commentDao.insertComment(content.blogId,content.parent,content.parentName,content.userName,content.email,content.comment,timeUtil.getNow(), timeUtil.getNow(), (res) => {
            response.writeHead(200);
            response.write(respUtil.writeRes('success','评论成功',null));
            response.end();
        })
    })
}
path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    let img = captcha.create({fontSize: 50, width: 100, height: 30});
    response.writeHead(200);
    response.write(respUtil.writeRes("success", "请求成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);
module.exports.path = path;
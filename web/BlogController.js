const blogDao = require("../dao/BlogDao");
const tagsDao = require("../dao/TagsDao");
const tagBlogMappingDao = require("../dao/TagBlogMappingDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/respUtil");
const url = require("url");
var path = new Map();


function queryHotBlog(request, response) {
    blogDao.queryHotBlog(function (result) {
        response.send(respUtil.writeRes("success", "查询成功", result));
        response.end();
    });
}

path.set("/queryHotBlog", queryHotBlog);

function addViews(request, response){
    let blogId = request.query.blogId;
    blogDao.addViews(blogId, (res) => {
        response.send(respUtil.writeRes("success", "查询成功", res));
        response.end();
    })
}
path.set("/addViews", addViews);

function queryBlogByTagId(request, response){
    let params = request.query;
    tagBlogMappingDao.queryBlogByTagId(params.tagId, parseInt(params.page), parseInt(params.pageSize), function (result) {
        var blogList = [];
        console.log(result);
        for (var i = 0 ; i < result.length ; i ++) {
            blogDao.queryBlogById(result[i].blog_id, function (result) {
                blogList.push(result[0]);
            });
        }
        getResult(blogList, result.length, response);
    });
}
function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response);
        }, 10);
    } else {
        for (var i = 0 ; i < blogList.length ; i ++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,15}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeRes("success", "查询成功", blogList));
        response.end();
    }
}
path.set("/queryBlogByTagId", queryBlogByTagId);


function queryBlogCount(request, response){
    blogDao.queryBlogCount((res) => {
        response.send(respUtil.writeRes("success", "查询成功", res));
        response.end();
    })
}
path.set("/queryBlogCount", queryBlogCount);

function queryAllBlog(request, response){
    blogDao.queryAllBlog((res) => {
        response.send(respUtil.writeRes("success", "查询成功", res));
        response.end();
    })
}
path.set("/queryAllBlog", queryAllBlog);


function queryBlogById(request, response){
    let id = request.query.blogId;
    blogDao.queryBlogById(id,(res) => {
        response.send(respUtil.writeRes("success", "查询成功", res));
        response.end();
    })
}
path.set("/queryBlogById", queryBlogById);

function queryBlogByPage(request, response){
    let params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(params.page,params.pageSize,(res) => {
        res.forEach((val) => {
            val.content = val.content.replace(/<img[\w\W]*">/g,"");
            val.content = val.content.replace('&nbsp',"");
            val.content = val.content.replace(/<[\w\W]{1,15}>/g,"");
            val.content = val.content.substring(0, 600);
        })
        response.writeHead(200);
        response.write(respUtil.writeRes("success", "查询成功", res));
        response.end();
    })
}
path.set("/queryBlogByPage", queryBlogByPage);
function editBlog(request, response) {
    request.on("data", function (data) {
        let dataList = JSON.parse(data.toString());
        blogDao.insertBlog(dataList.title, dataList.content, dataList.tags.join('|'), 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeRes("success", "添加成功", null));
            response.end();
            let blogId = result.insertId;
            let tagList = dataList.tags;
            for (var i = 0 ; i < tagList.length ; i ++) {
                queryTag(tagList[i], blogId);
            }
        });
    });
}

path.set("/editBlog", editBlog);

function queryTag(tag, blogId){
    tagsDao.queryTag(tag,(res) => {
        if(res == null || res.length == 0){
            insertTag(tag,blogId);
        }
        else{
            insertTagBlogMappingDao(res[0].id,blogId);
        }
    })
}

function insertTag(tag, blogId){
    tagsDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),(res) => {
        insertTagBlogMappingDao(res.insertId,blogId)
    })
}

function insertTagBlogMappingDao(tagId,blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
}

module.exports.path = path;
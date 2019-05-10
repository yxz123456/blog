let everyDay = new Vue({
    el:"#every_day",
    data:{
        chinese:'',
        author:''
    },
    computed:{
        getChinese(){
            return this.chinese;
        },
        getAuthor(){
            return this.author;
        }
    },
    created(){
    //请求数据
        axios.get('queryEveryDay')
            .then((res) => {
                var dataList = res.data.data[0].content.split('|');
                this.chinese = dataList[0].trim();
                this.author = '———— ' + dataList[1].trim();
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

let article = new Vue({
    el:"#article_list",
    data: {
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        article_list:[]
    },
    computed:{
        jumpToPage(){
            return function(page){
                this.getPage(page, this.pageSize);
            }
        },
        getPage(){
            return function(page,pageSize){
                let params = location.search.includes("?") ? location.search.split("?")[1].split("&") : "";
                let tagId = "";
                for (var i = 0 ; i < params.length ; i ++) {
                    if (params[i].split("=")[0] == "tagId") {
                        try {
                            console.log(params[i].split("=")[1])
                            tagId = parseInt(params[i].split("=")[1]);
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                if(tagId == ""){
                    axios({
                        method:"GET",
                        url:`/queryBlogByPage?page=${page-1}&pageSize=${pageSize}`
                    }).then((res) => {
                        let result = res.data.data;
                        let list = [];
                        result.forEach((val) => {
                            let temp = {
                                title:val.title,
                                content:val.content,
                                date:formatTime(val.ctime*1000),
                                views:val.viewCount,
                                tags:val.tags.replace(/[|]/g," "),
                                link:`/blog_detail.html?blogId=${val.id}`
                            }
                            list.push(temp);
                        })
                        this.article_list = list;
                        this.page = page;
                        console.log('blog',res);
                    }).catch((err) => {
                        console.log('blog查询错误',err);
                    });
                    axios({
                        method: "GET",
                        url: "/queryBlogCount"
                    }).then((res) => {
                        console.log(res);
                        this.count = res.data.data[0].count;
                        this.generatePageTool;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else{
                    axios({
                        method:"GET",
                        url:`queryBlogByTagId?tagId=${tagId}&page=${page - 1}&pageSize=${pageSize}`
                    }).then((res) => {
                        let result = res.data.data;
                        let list = [];
                        result.forEach((val) => {
                            let temp = {
                                title:val.title,
                                content:val.content,
                                date:formatTime(val.ctime*1000),
                                views:val.viewCount,
                                tags:val.tags.replace(/[|]/g," "),
                                link:`/blog_detail.html?blogId=${val.id}`
                            }
                            list.push(temp);
                        })
                        this.article_list = list;
                        this.count = list.length;
                        this.generatePageTool;
                        this.page = page;
                        console.log(res);
                    }).catch((err) => {
                        console.log(err);
                    });
                }

            }
        },
        generatePageTool(){
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2){
                result.push({text:nowPage - 2,page:nowPage - 2});
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1,page:nowPage - 1});
            }
            result.push({text: nowPage, page:nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            return result;
        }

    },
    created(){
        this.getPage(this.page, this.pageSize);
    }
});

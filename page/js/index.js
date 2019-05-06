var everyDay = new Vue({
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

var article = new Vue({
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
                            tags:val.tags.replace('|'," "),
                            link:`/blog_detail.html?blogId=${val.id}`
                        }
                        list.push(temp);
                    })
                    this.article_list = list;
                    this.page = page;
                    console.log(res);
                }).catch((err) => {
                    console.log('blog查询错误',err);
                });
                axios({
                    method: "GET",
                    url: "/queryBlogCount"
                }).then((res) => {
                    console.log(res)
                    this.count = res.data.data[0].count;
                    this.generatePageTool;
                }).catch((err) => {
                    console.log(err);
                });

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
})
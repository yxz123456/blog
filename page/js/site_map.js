let siteMap = new Vue({
    el:"#article_list",
    data:{
        articleList:[]
    },
    methods:{
        getAllBlog(){
            axios({
                method:"GET",
                url:"/queryAllBlog",
            }).then((res) => {
                let result = res.data.data;
                result.forEach((val) => {
                    val.link = `/blog_detail.html?blogId=${val.id}`
                })
                this.articleList = result;
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    created(){
        this.getAllBlog();
    }
})
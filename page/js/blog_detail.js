let blogDetail = new Vue({
    el:"#blog",
    data:{
        title:"",
        tags:"",
        date:"",
        views:"",
        content:""
    },
    methods:{
        getBlogDetail(){
            let params = location.search.includes("?") ? location.search.split("?")[1].split("&") : "";
            if(!params){
                return;
            }
            let bid = -1;
            for (var i = 0 ; i < params.length ; i ++) {
                if (params[i].split("=")[0] == "blogId") {
                    try {
                        bid = parseInt(params[i].split("=")[1]);
                    }catch (e) {
                        console.log(e);
                    }
                }
            }
            console.log(bid)
            axios({
                method:"GET",
                url:`/queryBlogById?blogId=${bid}`
            }).then((res) => {
                let result = res.data.data[0];
                this.title = result.title;
                this.tags = result.tags.replace("|"," ");
                this.date = formatTime(result.ctime*1000);
                this.views = result.viewCount;
                this.content = result.content;
                console.log(res);
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    created(){
        this.getBlogDetail();
    }
})
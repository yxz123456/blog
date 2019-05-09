let blogDetail = new Vue({
    el:"#blog",
    data:{
        title:"",
        tags:"",
        date:"",
        views:"",
        content:"",
        id:""
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
            this.blogId = bid;
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
});

let sentComment = new Vue({
    el:"#send_comment",
    data:{
        name:"",
        email:"",
        comment:"",
        test:"",
        randomCode:"",
        randomCodeText:"",
        parent:-1,
        parentName:"",
        err:''
    },
    methods:{
        clear(){
            this.name = "";
            this.email = "";
            this.comment = "";
            this.test = "";
            this.parentName = "";
            this.parent = -1;
            this.getRandomCode();
        },
        sendComment(){
            if(this.test.toLowerCase() == this.randomCodeText.toLowerCase()){
                this.err = "";
                axios.post('/addComment',{
                    blogId:blogDetail.blogId,
                    userName:this.name,
                    parent:this.parent,
                    parentName:this.parentName,
                    email:this.email,
                    comment:this.comment,
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
                alert("评论成功");
                userComment.getComments()
                this.clear();
            }
            else{
                this.err = "验证码输入不正确";
            }

        },
        getRandomCode(){
            axios.get('/queryRandomCode')
                .then((res) => {
                this.randomCode = res.data.data.data;
                this.randomCodeText = res.data.data.text;
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    created(){
        this.getRandomCode();
    }

});

let userComment = new Vue({
    el:"#comment",
    data:{
        title:"",
        total:0,
        comments:[]
    },
    methods:{
        getComments(){
            axios({
                method:"GET",
                url:`/queryCommentsCountByBlogId?blogId=${blogDetail.blogId}`
            }).then((res) => {
                console.log(res)
                this.total = res.data.data[0].count;
            }).catch((err) => {
                console.log(err);
            });
            axios({
                method:"GET",
                url:`/queryCommentsByBlogId?blogId=${blogDetail.blogId}`
            }).then((res) => {
                let result = res.data.data;
                result.forEach((val) => {
                    val.ctime = formatTime(val.ctime*1000);
                    val.children.forEach((v) => {
                        v.ctime = formatTime(v.ctime*1000);
                    })
                })
                this.comments = result;
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        },
        answer(parentId,parentName){
            sentComment.parent = parentId;
            sentComment.parentName = parentName;

        }
    },
    created(){
        this.getComments();
        setTimeout(()=>{
            this.title = blogDetail.title
        },500)
    }
});
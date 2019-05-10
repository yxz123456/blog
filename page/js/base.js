var randomTags = new Vue({
    el: "#tags",
    data:{
        tags:[]
    },
    methods:{
        getRandomTags(){
            axios({
                method:"GET",
                url:"/queryRandomTag"
            }).then((res) => {
                let result = res.data.data;
                result.forEach((val) => {
                    val.link = `/?tagId=${val.id}`
                })
                this.tags = result;
                console.log('tag',res);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    computed:{
        randomColor(){
            return function(){
                var red = Math.random()*255 + 50,
                    green = Math.random()*255 + 50,
                    blue = Math.random()*255 + 50;
                return `rgb(${red},${green},${blue})`;
            }
        },
        randomFontSize(){
            return function(){
                var fontSize = Math.random()*14 + 12;
                return `${fontSize}px`;
            }
        }
    },
    created(){
        this.getRandomTags();
    }
});

var hot = new Vue({
    el:"#hot",
    data:{
        hotList:[]
    },
    methods:{
        getHotBlog(){
            axios({
                method:"GET",
                url:"/queryHotBlog"
            }).then((res) => {
                let result = res.data.data;
                result.forEach((val) => {
                    val.link = `/blog_detail.html?blogId=${val.id}`;
                });
                this.hotList = result;
                console.log("hot",res);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    created(){
        this.getHotBlog();
    }
});

var newComments = new Vue({
    el:"#newComment",
    data:{
        commentList:[]
    },
    methods:{
        getNewComments(){
            axios({
                method:"GET",
                url:"/queryNewComments"
            }).then((res) => {
                let result = res.data.data;
                result.forEach((val) => {
                    val.ctime = formatTime(val.ctime*1000);
                });
                this.commentList = result;
                console.log(res)
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    created(){
        this.getNewComments();
    }
});
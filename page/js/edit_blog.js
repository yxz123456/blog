var edit = new Vue({
    el:"#edit",
    data:{
        title:"",
        tag:"",
        tags:[]
    },
    methods:{
        addTag(){
            if(this.tag.trim() !== ""){
                var len = this.tags.length;
                this.$set(this.tags, len, this.tag.trim());
                this.tag = '';
            }
        },
        cancel(index){
            this.tags.splice(index,1);
        }
    }
});

let submit = document.getElementsByClassName('submit')[0];

submit.addEventListener('click', function(){
    if(editor.txt.text() && edit.title && edit.tags){
        axios.post('/editBlog',{
            content:editor.txt.html(),
            title:edit.title,
            tags:edit.tags
        }).then((res) => {
            alert('发布成功');
            editor.txt.text('');
            edit.title = '';
            edit.tags.splice(0);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    else{
        alert("信息不能为空");
    }

})
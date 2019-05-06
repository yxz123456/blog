var randomTags = new Vue({
    el: "#tags",
    data:{
        tags:[{tagName:'123',link:'/'},
            {tagName:'asfas',link:'/'},
            {tagName:'1dsgfd23',link:'/'},
            {tagName:'fghfj',link:'/'},
            {tagName:'fgfdds',link:'/'},
            {tagName:'swqr',link:'/'},
            {tagName:'zvxv',link:'/'},
            {tagName:'vcnbvn',link:'/'}]
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

    }
});

var hot = new Vue({
    el:"#hot",
    data:{
        hotList:[
            {title:'sasdgd',link:'/'},
            {title:'afasf',link:'/'},
            {title:'afdgsasf',link:'/'},
            {title:'dsgdsg',link:'/'},
            {title:'sdgsg',link:'/'},
            {title:'afhgjkghkasf',link:'/'},
            {title:'kbm',link:'/'},
            {title:'vbnvn',link:'/'},
        ]
    },
    created(){
        //
    }
});

var newComments = new Vue({
    el:"#newComment",
    data:{
        commentList:[
            {
                userName:'张三',
                date:'2019-5-4',
                content: 'asfgfasf',
                link:'/'
            },{
                userName:'张三',
                date:'2019-5-4',
                content: 'asfgfasf',
                link:'/'
            },{
                userName:'张三',
                date:'2019-5-4',
                content: 'asfgfasf',
                link:'/'
            },{
                userName:'张三',
                date:'2019-5-4',
                content: 'asfgfasf',
                link:'/'
            },
        ]
    },
    created(){

    }
});
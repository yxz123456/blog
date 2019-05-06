var button = document.getElementsByClassName('button')[0];
button.addEventListener('click',function(){
    // console.log(editor.txt.text());
    axios.post('/editEveryDay',{
        content:editor.txt.text()
    }).then((res) => {
        alert(res.msg);
        editor.txt.text('');
    }).catch((err) => {
        console.log(err);
    })

})

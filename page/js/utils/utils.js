function formatTime(num){
    let time = new Date(parseInt(num));
    return `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
}
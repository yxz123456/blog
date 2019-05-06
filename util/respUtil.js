function writeRes(status, msg, data){
    return JSON.stringify({
        status,
        msg,
        data
    });
}

module.exports.writeRes = writeRes;
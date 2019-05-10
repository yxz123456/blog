var mysql = require("mysql");

function createConnection(){
    var connection = mysql.createConnection({
        host:"100.64.9.22",
        port:"3306",
        user:"root",
        password:"yxz123456..",
        database: "my_blog"
    });
    return connection;
}

module.exports = {
    createConnection
}
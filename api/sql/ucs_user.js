// const mysql = require('mysql')
// const connection = mysql.createConnection({
//     host:'182.254.128.241:4171',
//     user:'sm_log_read',
//     password:'23TfFY48S4JW',
//     database:'user_info'
// });
// connection.connect();
const query = async(sql, arr, callback)=>{
    //建立链接
    connection.getConnection(function(err,connection){
        if(err){throw err;return;}
        connection.query(sql,arr,function(error,results,fields){
            //将链接返回到连接池中，准备由其他人重复使用
            connection.release();
            if(error) throw error;
            //执行回调函数，将数据返回
            callback && callback(results,fields);
        });
    });
};
const add = async(params)=>{
    connection.query(params,function(){

    });
}
const delet = async(params)=>{

}
const update = async(params)=>{

}
const find = async(params)=>{
    connection.query(params,function(){

    });
}
module.exports = {
    query:query,
    add:add,
    delet:delet,
    update:update,
    find:find,
}
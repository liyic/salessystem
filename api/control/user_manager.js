// const Koa = require('koa')
// const add = new Koa()
const monk = require('monk');
const url = '47.106.150.86:2018/sales_system';
const db = monk(url);
const uid = require('uuid');
const collection = db.get('user_info');
const ucs_user = require('../sql/ucs_user');
const catch_msg = "抱歉，发生了不正常的事情，请再多试试。";
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '182.254.128.241',
    port: '8612',
    user: 'sm_e_account_dev',
    password: 'x6928Mq5Mgr3',
    // database: 'user_info'
});

connection.connect();
/**
 * 登录
 */
const login = async (ctx, next) => {
    let params = ctx.request.body;
    let res_state = true;
    let res_code = 0;
    let res_msg = null;
    await collection.find({
        user_name: params.user_name,
        password: params.password,
        user_type: params.type
    }).then((docs) => {
        try {
            res_state = true;
            if (docs.length != 0) {
                res_msg = "登录成功";
                res_code = 1;
            } else {
                res_msg = "请输入正确的用户名密码";
                res_code = 0;
            }
        } catch (err) {
            ctx.body = {"params": catch_msg, "success": false}
        }
    });
    ctx.body = {
        "response": {
            msg: res_msg,
            code: res_code
        }, "success": res_state
    }
}
/**
 * 修改密码
 */
const modify_pwd = async (ctx, next) => {
    let params = ctx.request.body;
    let res_code = 0;
    let res_msg = null;
    await collection.update({
        user_name: params.user_name,
        user_type: params.type
    }, {$set: {password: params.password}}).then((result) => {
        try {
            if (result.ok == 1) {
                res_msg = "修改成功";
                res_code = 1;
            } else {
                res_msg = "修改失败";
                res_code = 0;
            }
        } catch (e) {
            ctx.body = {msg: catch_msg, success: false}
        }
    });
    ctx.body = {"response": {"msg": res_msg, code: res_code}, "success": true};
}
let query = function (sql, values) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, rows) => {
            if (err) {
                reject(err)
                return {data:err,success:false}
            } else {
                resolve(rows)
                return rows
            }
        })
    })
}
/**
 * 用户管理表格搜索
 */
const search_table = async (ctx, next) => {
    let params = ctx.request.body;
    let per_page = params.per_page;
    let search_content = params.search_content;
    let type = params.type;
    let page = ((params.page-1)*per_page);
    let code = 0;
    let type_code = "";

    if(type=="new"){
        type_code = "AND `status`=1";

    }else if(type=="pass"){
        type_code = "AND `status`=-1";

    }else {
        type_code = "";
    }
    let sql = "SELECT uu.id,uu.apply_status,uu.mobile,uu.company,uu.real_name,uu.create_time,status FROM easy_user_test.ucs_user uu WHERE CONCAT(mobile,company,real_name) LIKE '%"+search_content+"%' "+type_code+" ORDER BY create_time DESC limit "+page+","+per_page
    let sql2 = "SELECT COUNT(*) FROM easy_user_test.ucs_user WHERE CONCAT(mobile,company,real_name) LIKE '%"+search_content+"%' "+type_code
    let query = function (sql, values) {
        // 返回一个 Promise
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                    code = 1;
                }
            })
        })
    }
    let data = await query(sql);
    let total = await query(sql2)
    ctx.body = {"response": {"data": data,"total":total[0]['COUNT(*)'],code: code}, "success": true};
}
/**
 * 申请延期
 */
const apply_extension = async (ctx, next) => {
    let params = ctx.request.body;
    let add_style = params.add_style;
    let query = function (sql, values) {//数据库添加的方法
        // 返回一个 Promise
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, rows) => {
                if (err) {
                    reject(err)
                    msg = "异常了，请重试"
                } else {
                    resolve(rows)
                    msg = "延期成功"
                    code = 1
                }
            })
        })
    }
    let id = params.id;
    let code = 0;
    let msg = "";
    if(add_style=="single"){
        let type = params.type+1;
        let sql = "UPDATE easy_user_test.ucs_user SET apply_status="+type+",status=0,effective_day=7 WHERE id='"+id+"'";
        await query(sql);
    }else{
        for(let i = 0;i<id.length;i++){
            let type = parseInt(params.type[i])+1;
            let sql = "UPDATE easy_user_test.ucs_user SET apply_status="+type+",status=0,effective_day=7 WHERE id='"+id[i]+"'";
            await query(sql);
        }
    }
    ctx.body = {"response": {msg: msg,code: code}, "success": true};
}
/**
 * 账号申请
 */
const account_apply = async (ctx, next) => {
    let params = ctx.request.body;
    let id = uid.v1().replace(/\-/g,'');
    let sql = "INSERT INTO easy_user_test.ucs_user (id,real_name,mobile,company,account_manager,user_status,create_time,effective_day,apply_product,remarks,status) VALUES('"+id+"','"+params.real_name+"',"+params.mobile+",'"+params.company+"','"+params.account_manager+"',"+params.user_status+",'"+params.creat_time+"',"+params.effective_day+","+params.apply_product+",'"+params.remarks+"',1)";
    const status = await query(sql);
    let code = 0;
    let rstate = false;
    let msg = "";

    if(status){
        code = 1;
        rstate = true;
        msg = "添加成功"
    }else{
        rstate = false
        code = 0;
        msg = status.data;
    }
    ctx.body = {"response": {msg: msg,code: code}, "success": rstate};
}
module.exports = {
    login: login,
    modify_pwd: modify_pwd,
    search_table: search_table,
    apply_extension:apply_extension,
    account_apply:account_apply
}
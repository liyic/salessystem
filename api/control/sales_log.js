/**
 * 销售日志
 */
const url = '47.106.150.86:2018/sales_system';
const catch_msg = "抱歉，发生了不正常的事情，请再多试试。";
const uid = require('uuid');
const mysql = require('mysql');
const public_fn = require('../public/javascripts/public');
const connection = mysql.createConnection({
    host: '182.254.128.241',
    port: '8612',
    user: 'sm_e_account_dev',
    password: 'x6928Mq5Mgr3',
    // database: 'user_info'
});
connection.connect();

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
 * 表格
 */
const log_list = async (ctx, next) => {
    let params = ctx.request.body;

    let sql = "SELECT uu.id,uu.mobile,uu.company,uu.name,uu.visit_date,position FROM easy_user_test.sales_log uu WHERE CONCAT(mobile,company,name) LIKE '%"+params.search_content+"%' ORDER BY visit_date DESC limit "+((params.page-1)*params.per_page)+","+params.per_page
    let sql2 = "SELECT COUNT(*) FROM easy_user_test.sales_log WHERE CONCAT(mobile,company,name) LIKE '%"+params.search_content+"%' "
    let code = 0;
    let data = null;
    let total = null;
    let status1 = await query(sql);
    let status2 = await query(sql2);
    if(status1 && status2){
        code = 1;
        data = status1;
        total = status2;
    }
    ctx.body = {"response": {"data": data,"total":total[0]['COUNT(*)'],code: code}, "success": true};
}
/**
 * 新增潜在客户
 */
const add_user = async (ctx, next) => {
    let params = ctx.request.body;
    let code = 0;
    let msg = "";
    let id = uid.v1().replace(/\-/g,'');
    let today = public_fn.get_today();
    console.log(today)
    let sql = "INSERT INTO easy_user_test.sales_log (id,`name`,mobile,company,position,email,creat_time,customer_source,account_manage,apply_product,remarks) VALUES('"+id+"','"+params.name+"',"+params.mobile+",'"+params.company+"','"+params.position+"','"+params.email+"','"+today+"','"+params.customer_source+"','"+params.account_manage+"',"+params.apply_product+",'"+params.remarks+"')";
    let status = await query(sql);
    if(status){
        code = 1;
        msg = "添加成功";
    }
    ctx.body = {"response": {"msg": msg,code: code}, "success": true};
}
/**
 * 填写拜访日志
 */
const write_log = async (ctx, next) => {
    let params = ctx.request.body;
    let code = 0;
    let msg = "";
    let today = public_fn.get_today();
    let sql = "UPDATE easy_user_test.sales_log SET visit_date='"+today+"',log='"+params.log+"' WHERE id='"+params.id+"'";
    let status = await query(sql);
    if(status){
        code = 1;
        msg = "添加成功";
    }
    ctx.body = {"response": {"msg": msg,code: code}, "success": true};
}
/**
 * 填写拜访日志搜索列表
 */
const search_customer = async (ctx, next) => {
    let params = ctx.request.body;
    let code = 0;
    let data = null;
    let sql = "SELECT uu.id,uu.name,uu.company,uu.name FROM easy_user_test.sales_log uu WHERE CONCAT(mobile,company,name) LIKE '%"+params.search_contnt+"%'"
    let status = await query(sql);
    if(status){
        code = 1;
        data = status;
    }
    ctx.body = {"response": {"data": data,code: code}, "success": true};
}
/**
 * 统计数据
 */
const statistics_log = async (ctx, next) => {
    let code = 0;
    //上一周拜访客户数，先获取到今天史星期几，然后往前推。
    let week = public_fn.get_today('lastweek');
    let month = public_fn.get_today('month');
    let weeksql = "SELECT COUNT(*) FROM easy_user_test.sales_log WHERE visit_date BETWEEN '"+week.start_date+"' AND '"+week.end_date+"'";
    let monthsql = "SELECT COUNT(*) FROM easy_user_test.sales_log WHERE visit_date BETWEEN '"+month.start_date+"' AND '"+month.end_date+"'";
    let add_user = "SELECT COUNT(*) FROM easy_user_test.sales_log WHERE creat_time BETWEEN '"+month.start_date+"' AND '"+month.end_date+"'";
    let week_number = await query(weeksql);
    let month_number = await query(monthsql);
    let add_number = await query(add_user);
    if(week_number&&month_number&&add_number){
        code = 1;
    }
    ctx.body = {"response": {"data": {"last_week":week_number[0]['COUNT(*)'],"month":month_number[0]['COUNT(*)'],"add_user":add_number[0]['COUNT(*)']},code: code}, "success": true};
}
/**
 * 统计数据
 */
const statistics_chart = async (ctx, next) => {
    let params = ctx.request.body;
    let frq = params.frq;
    let start_date = "";
    let end_date = "";
    let status = falseq
    if(frq!==null){
        let date = public_fn.get_today(frq);
        start_date = date.start_date;
        end_date = date.end_date;
    }else{
        start_date = params.start_date;
        end_date = params.end_date;
    }
    console.log(start_date,end_date);
    let sql = "SELECT COUNT(creat_time) AS count,DATE_FORMAT(creat_time,'%Y-%m-%d') FROM easy_user_test.sales_log WHERE creat_time BETWEEN '"+start_date+"' AND '"+end_date+"' GROUP BY DATE_FORMAT(creat_time,'%Y-%m-%d')"
    let sqldata = await query(sql);
    let data = {dates:[],value:[]};
    if(sqldata){
        status = true
        for(let i = 0;i<sqldata.length;i++){
            data.dates.push(sqldata[i]["DATE_FORMAT(creat_time,'%Y-%m-%d')"]);
            data.value.push(sqldata[i]["count"]);
        }
    }
    ctx.body = {"response": {"data": data}, "success": status};
}
module.exports = {
    log_list:log_list,
    add_user:add_user,
    write_log:write_log,
    search_customer:search_customer,
    statistics_log:statistics_log,
    statistics_chart:statistics_chart
}
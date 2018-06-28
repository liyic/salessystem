/**
 * 获取到今天
 */
const get_today = function(type){
    let date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month<10){
        month="0"+month
    }
    let get_fre_= function(n1,n2){//获取到上周的方法。
        let date2 = new Date(date.setDate(date.getDate()+n1));
        let date3 = new Date(date.setDate(date.getDate()+n2));
        let month2 = date2.getMonth()+1;
        let month3 = date3.getMonth()+1;
        if(month2<10){
            month2="0"+month2
        }
        if(month3<10){
            month3="0"+month3
        }
        let start_date = date2.getFullYear()+"-"+month2+"-"+date2.getDate();
        let end_date = date3.getFullYear()+"-"+month3+"-"+date3.getDate();
        return {"start_date":start_date,"end_date":end_date};
    };
    switch(type){
        case "lastweek":
            let day_of_week = date.getDay();
            return get_fre_(-day_of_week - 6,6);
            break;
        case "month":
            return {"start_date":date.getFullYear()+"-"+month+"-01 00:00:00","end_date":date.getFullYear()+"-"+month+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()};
        case "m1":
            return get_fre_(-30,31);
        case "m3":
            return get_fre_(-92,92);
        case "m6":
            return get_fre_(-182,182);
        default:
            return date.getFullYear()+"-"+month+"-"+day+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }
}
module.exports={
    get_today:get_today
}
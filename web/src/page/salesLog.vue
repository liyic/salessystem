<template>
    <!-- 用户表 -->
    <div v-if="state==='main'">
        <el-row class="mtop60">
            <el-col class="box-module" :span="22" :offset="1">
                <div>
                    <el-button class="btn btn-main" type="button" @click="toggle('add_user')">新增潜在客户</el-button>
                    <el-button class="btn btn-main" type="text" @click="write_log.centerDialogVisible = true,write_log.is_search = true,log=''">填写拜访日志</el-button>
                    <el-button class="btn btn-main" type="button" @click="state='stats'">统计数据</el-button>
                    <el-input class="search-cnt" placeholder="请输入内容" v-model="search_cnt">
                        <template slot="append"><el-button class="search-btn" @click="initTbl(currentPage,number)" type="primary">搜索</el-button></template>
                    </el-input>
                </div>
                <el-table
                    :data="table_data"
                    style="width: 100%;margin-top: 20px;text-align: center">
                    <el-table-column
                        prop="number"
                        label="序号"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号码"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="company"
                        label="所属公司"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="position"
                        label="职务"
                        width="130">
                    </el-table-column>
                    <el-table-column :formatter="dateFormat"
                        label="最近拜访日期"
                        >
                    </el-table-column>
                    <el-table-column prop="id" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="applicationExtension(scope.row['id'])">添加拜访日志</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block mtop20">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50,]"
                        :page-size=number
                        layout="total, sizes, prev, pager, next, jumper"
                        :total=total>
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!-- 对话框 -->
        <el-dialog
            :visible.sync="write_log.centerDialogVisible"
            width="34%"
            center="true">
            <h3 style="text-align: center">填写拜访日志</h3>
            <div class="mtop20">
                <p>本次拜访日期：<span>{{visit_date}}</span></p>
            </div>
            <div v-show="write_log.is_search" class="mtop20" style="height: 30px;">
                <span class="left" style="line-height: 36px">本次拜访客户：</span>
                <el-input v-show="!search_list_status" class="search-cnt" style="float: left" placeholder="请输入内容" v-model="write_log.search_cnt">
                    <template slot="append">
                        <el-button class="search-btn" @click="search_customer" type="button">搜索</el-button>
                    </template>
                </el-input>
                <el-select v-show="search_list_status" class="selected left" v-model="write_log.user_id" clearable placeholder="请选择" style="display: inline-block;width: 340px">
                    <el-option
                        v-for="item in search_list"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button v-show="search_list_status" class="search-btn left" type="primary" style="margin-left: 10px" @click="search_list_status=false">重新搜索</el-button>
                <span class="left mleft20 hand" @click="write_log.is_search=false,state='add_user'" style="line-height: 36px">添加</span>
            </div>
            <div class="mtop20">
                <span>本次拜访日志</span>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="log">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit_log">提交</el-button>
                <el-button @click="write_log.centerDialogVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 统计数据 -->
    <div v-else-if="state==='stats'">
        <el-row style="margin-top: 40px;">
            <el-col :span="22" :offset="1">
                <div class="user-info-title">
                    <i class="el-icon-arrow-left hand"  @click="state='main'"></i>
                    <span class="mleft20">统计数据</span>
                </div>
                <div class="block mtop60" style="display: flex">
                    <div class="sbox-module">
                        <div class="left-cnt">
                            <span class="number">
                                {{week_number}}
                            </span>
                            <span class="title">
                                上周拜访客户数
                            </span>
                        </div>
                        <div class="right-cnt">
                            <img class="data-icon" src="../assets/img/log/data_icon.png" alt="">
                        </div>
                    </div>
                    <div class="sbox-module">
                        <div class="left-cnt">
                            <span class="number">
                                {{month_number}}
                            </span>
                            <span class="title">
                                本月拜访客户数
                            </span>
                        </div>
                        <div class="right-cnt">
                            <img class="data-icon" src="../assets/img/log/data_icon.png" alt="">
                        </div>
                    </div>
                    <div class="sbox-module">
                        <div class="left-cnt">
                            <span class="number">
                                {{add_user}}
                            </span>
                            <span class="title">
                                本月新增潜在客户数
                            </span>
                        </div>
                        <div class="right-cnt">
                            <img class="data-icon" src="../assets/img/log/data_icon.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="block mtop60 box-module">
                    <div class="user-info-title">
                        <span class="mleft20" style="font-size: 14px;">拜访客户数</span>
                    </div>
                    <div class="mtop20">
                        <button class="checkbtn" :class="{active:chart_frq=='m1'}" @click="chart_frq='m1'">最近一个月</button>
                        <button class="checkbtn mleft20" :class="{active:chart_frq=='m3'}" @click="chart_frq='m3'">最近三个月</button>
                        <button class="checkbtn mleft20" :class="{active:chart_frq=='m6'}" @click="chart_frq='m6'">最近半年</button>
                        <span class="mleft40 f14">区间选择：
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                            </el-date-picker> 至
                            <el-date-picker v-model="value2" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </span>
                    </div>
                    <div class="charts" style="min-height: 300px">
                        <tendency :categories='categories' :series='series'></tendency>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
    <!-- 显示用户信息 -->
    <div v-else-if="state==='showuser'">
        <el-row style="margin-top: 40px;">
            <el-col :span="22" :offset="1">
                <div class="user-info-title">
                    <i class="el-icon-arrow-left"></i>
                    <span class="mleft20">用户信息</span>
                </div>
            </el-col>
  			<el-col :span="12" class="mtop20" style="border-right: 2px solid #DFDFDF;">
                <div style="text-align: center">
                    <el-form class="from1" :model="userinfo1" :rules="show_rules" ref="userinfo1">
                        <el-form-item prop="name">
                            <p>姓名：</p>
                            <el-input v-model="userinfo1.name" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="company">
                            <p>所属公司：</p>
                            <el-input v-model="userinfo1.company"></el-input>
                        </el-form-item>
                        <el-form-item prop="position">
                            <p>公司职务：</p>
                            <el-input v-model="userinfo1.position"></el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <p>公司邮箱：</p>
                            <el-input v-model="userinfo1.email"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <p>客户来源：</p>
                            <el-select class="selected" v-model="userinfo1.customer_source" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in origin"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <p>所属客户经理：</p>
                            <el-select class="selected" v-model="userinfo1.account_manage" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in add_ownedmanager"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <p>备注信息：</p>
                            <el-input type="textarea" :model="note"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
  			</el-col>
            <el-col :span="12" class="mtop20">
                <div style="text-align: center">
                    <el-form class="from1" :model="userinfo2" :rules="rules2" ref="userinfo2">
                        <el-form-item prop="userphone">
                            <p>手机号码：</p>
                            <el-input v-model="userinfo2.userphone" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <p>申请产品：</p>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="FOF Easy"></el-checkbox>
                                <el-checkbox label="FOF Power"></el-checkbox>
                                <el-checkbox label="数据库"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <p>用户状态：</p>
                            <el-select class="selected" v-model="value4" clearable placeholder="试用用户">
                                <el-option
                                    v-for="item in origin"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <p>账号状态：</p>
                            <el-select class="selected" v-model="value4" clearable placeholder="已过期">
                                <el-option
                                    v-for="item in origin"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <p>名片信息：</p>
                            <img src="../assets/img/Bitmap.png" alt="">
                            <span class="right maincolor" style="line-height: 108px">修改名片信息</span>
                        </el-form-item>
                        <el-form-item class="mtop10">
                            <p><span>最近拜访日志：</span><span class="right maincolor">查看更多</span></p>
                            <el-input type="textarea" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
  		</el-row>
    </div>
    <!-- 添加用户信息 -->
    <div v-else-if="state==='add_user'">
        <el-row style="margin-top: 40px;">
            <el-col :span="22" :offset="1">
                <div class="user-info-title">
                    <i @click="toggle('main')" class="el-icon-arrow-left hand"></i>
                    <span class="mleft20">添加用户信息</span>
                </div>
            </el-col>
            <el-form name="userinfo" :model="userinfo1" :rules="add_rules" ref="userinfo1">
                <el-col class="box-module mtop40" :span="22" :offset="1">
                    <el-col :span="24">
                        <el-col :span="12" class="mtop20 center" style="border-right: 2px solid #DFDFDF;">
                            <div style="width: 340px;display: inline-block;">
                                <el-form-item prop="real_name">
                                    <p class="left">姓名：</p>
                                    <el-input v-model="userinfo1.name" placeholder="姓名"></el-input>
                                </el-form-item>
                                <el-form-item prop="mobile">
                                    <p class="left">手机号码</p>
                                    <el-input v-model="userinfo1.mobile" placeholder="手机号" ></el-input>
                                </el-form-item>
                                <el-form-item prop="company">
                                    <p class="left">所属公司</p>
                                    <el-input v-model="userinfo1.company" placeholder="所属公司"></el-input>
                                </el-form-item>
                                <el-form-item prop="position">
                                    <p class="left">公司职务</p>
                                    <el-input v-model="userinfo1.position" placeholder="公司职务"></el-input>
                                </el-form-item>

                                <el-form-item prop="email">
                                    <p class="fleft">公司邮箱</p>
                                    <el-input v-model="userinfo1.email" placeholder="公司邮箱"></el-input>
                                </el-form-item>
                                <p class="fleft f14">客户来源</p>
                                <el-form-item class="mtop6">
                                    <el-select class="selected" v-model="userinfo1.customer_source" clearable
                                               placeholder="请选择">
                                        <el-option
                                            v-for="item in customer_source"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12" class="mtop20 center">
                            <div style="width: 340px;display: inline-block;">
                                <el-form-item>
                                    <p class="fleft">所属客户经理</p>
                                    <el-select class="selected" v-model="userinfo1.account_manage" clearable
                                               placeholder="请选择">
                                        <el-option
                                            v-for="item in add_ownedmanager"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <p style="height: 40px"><span class="left">申请产品</span></p>
                                    <el-checkbox-group v-model="userinfo1.checkbox_data" style="text-align: left">
                                        <el-checkbox label="FOF Easy"></el-checkbox>
                                        <el-checkbox label="FOF Power"></el-checkbox>
                                        <el-checkbox label="数据库"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item>
                                    <p class="left">名片信息</p>
                                    <div class="add-card" v-show="!is_have_card" style="width: 340px">
                                        <el-upload
                                            class="upload-demo"
                                            drag
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            multiple>
                                            <i class="el-icon-plus" style="position: relative;top: -10px;"></i>
                                            <div class="el-upload__text" style="display: inline-block;width:70%;">
                                                <div style="height: 18px;">添加名片信息</div>
                                                <div style="height: 18px;">只支持JPG、PNG、大小不超过5M</div>
                                            </div>
                                        </el-upload>
                                    </div>
                                    <div v-show="is_have_card">
                                        <img src="../assets/img/Bitmap.png" alt="">
                                        <span class="right maincolor" style="line-height: 108px">修改名片信息</span>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <p class="left"><span>备注信息</span></p>
                                    <el-input type="textarea" v-model="userinfo1.remarks"></el-input>
                                </el-form-item>

                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="center">
                        <el-col :span="12">
                            <el-button class="btn btn-main big-btn" type="button">取消</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="btn btn-main big-btn" type="button" @click="submitForm('userinfo1')">保存</el-button>
                        </el-col>
                    </el-col>
                </el-col>

            </el-form>
        </el-row>
    </div>
</template>

<script>
    import tendency from '../components/tendency'
    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData';
    import {baseUrl, baseImgPath} from '@/config/env';
    import HighCharts from 'highcharts/highcharts';
    export default {
    	data(){
    		return {
    		    chart_frq:"m1",
                note:"",
                value4:"",
                checkList: [],
                state:"main",
                search_cnt:"",
                total:0,
                currentPage:1,
                is_have_card:false,
                number:10,
                textarea: '',
                log:"",
                visit_date:"",
                userinfo1:{
                    name:"",
                    mobile:"",
                    company:"",
                    position:"",
                    email:"",
                    customer_source:"",
                    account_manage:"",
                    checkbox_data:[],
                    apply_product:0,
                    remarks:"",
                },
                value1:"",
                value2:"",
                write_log:{
                    user_id:"",
                    search_cnt:"",
                    centerDialogVisible: false,//模态框参数
                    is_search:true,
                },
                table_data:[

                ],
                add_rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'}
                    ],
                    company: [
                        {required: true, message: '请输入公司', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '请输入公司职务', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入公司邮箱', trigger: 'blur'},
                    ],
                },

                userinfo2:{
                    userphone:"",

                },
                add_ownedmanager:[{
                    value: '奥斯丁',
                    label: '某某某'
                },{
                    value: '奥斯丁2',
                    label: '某某某2'
                }],
                ownedmanager:[{
                    value: 'asds',
                    label: '某某某'
                }],
                customer_source:[
                    {
                        value: '转介绍',
                        label: '转介绍'
                    },
                    {
                        value: '官网注册',
                        label: '官网注册'
                    },{
                        value: '11',
                        label: '来电咨询'
                    }
                    ],
                account_manage:[
                    {
                        value: '冯青柳',
                        label: '冯青柳'
                    },
                    {
                        value: '陈浩',
                        label: '陈浩'
                    },{
                        value: '翟慧慧',
                        label: '翟慧慧'
                    }
                ],
                search_list:[

                ],
                search_list_status:false,
                week_number:0,//上周拜访客户数
                month_number:0,//本月拜访客户数
                add_user:0,//本月新增潜在客户数
                categories:[],
                series:[],
    		}
    	},
    	components: {
            tendency
    	},
    	mounted(){
            this.initTbl(1,10);
            this.statistics_log();
            this.visit_date = this.get_today(1);
            this.get_chart_data();
    	},
    	methods: {
    	    toggle:function(type){
    	        this.state = type;
    	        this.write_log.centerDialogVisible = false;
            },
            add_number:function(number,page,data){//添加序号
                for(var i = 0;i<data.length;i++){
                    data[i].number = (number*(page-1))+1+i;
                }
                return data
            },
            handleSizeChange(val) {
                this.number = val;
                this.initTbl(this.page,this.number);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.initTbl(this.page,this.number);
            },
            //时间格式化
            dateFormat:function(row, column) {
                var date = row["visit_date"];
                if (date == "undefined" ||date == null ) {
                    return "--";
                }else{
                    return this.formatterDate(row["visit_date"]);
                }
                // return (date).format("YYYY-MM-DD HH:mm:ss");
            },
            formatterDate:(val)=>{
                let data = new Date(val);
                let month = data.getMonth()+1;
                let day = data.getDate();
                if(month<10){
                    month = "0"+month;
                }
                if(day<10){
                    day = "0"+day;
                }
                return data.getFullYear()+"-"+month+"-"+day
            },
            get_today:(type)=>{//1是代表年月日 2是加上了时分秒
                let data = new Date();
                let month = data.getMonth()+1;
                let day = data.getDate();
                if(month<10){
                    month = "0"+month;
                }
                if(day<10){
                    day = "0"+day;
                }
                if(type==1){
                    return data.getFullYear()+"-"+month+"-"+day
                }else{
                    return data.getFullYear()+"-"+month+"-"+day+" "+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds()
                }
            },
            initTbl: function (page, number) {
                let that = this;
                let params = {
                    per_page: number,
                    page: page,
                    search_content:that.search_cnt
                }
                this.axios.post(baseUrl+"/log_list",params).then(function(res) {
                    if(res.data.success){
                        if(res.data.response.code==1){
                            that.table_data = res.data.response.data;
                            that.total = res.data.response.total;
                            that.add_number(number,page,that.table_data)
                        }
                    }
                });
            },           //账号申请
            async submitForm(formName)
            {
                let that = this;
                this.userinfo1.apply_product=0;
                this.$refs[formName].validate(async (valid) => {
                    let params = null
                    if (valid) {
                        let data = that.userinfo1;
                        //多选框选中的特殊一点
                        let checkbox = data.checkbox_data;
                        let apply = {"FOF Easy": 0, "FOF Power": 1, "数据库": 2}
                        let checkbox_result = 0;
                        if (checkbox.length == 1) {
                            that.userinfo1.apply_product = apply[checkbox[0]]
                        } else if (checkbox.length == 2) {
                            let result = 0;
                            for (let i = 0; i < checkbox.length; i++) {
                                that.userinfo1.apply_product+=apply[checkbox[i]]+1;
                            }
                        } else {
                            that.userinfo1.apply_product = 6;
                        }
                        let params = that.userinfo1;
                        this.axios.post(baseUrl+"/add_user",params).then(function(res) {
                            if(res.data.success){
                                if(res.data.response.code==1){
                                    that.$message({
                                        type: 'success',
                                        message: res.data.response.msg
                                    });
                                    that.userinfo1={
                                        name:"",
                                        mobile:"",
                                        company:"",
                                        position:"",
                                        email:"",
                                        customer_source:"",
                                        account_manage:"",
                                        checkbox_data:[],
                                        apply_product:0,
                                        remarks:"",
                                    }
                                    that.statistics_log();
                                }else{
                                    that.$notify.error({
                                        title: '错误',
                                        message: "好像出了点问题。请再试一次"
                                    });
                                }
                            }
                        });
                    } else {
                        that.$notify.error({
                            title: '错误',
                            message: '请输入姓名，手机号，所属公司，公司职务，公司邮箱',
                            offset: 100
                        });
                        return false;
                    }


                });
            },
            applicationExtension:function(id){
    	        this.write_log.centerDialogVisible = true;
                this.write_log.user_id = id;
    	        this.write_log.is_search = false;
                this.visit_date = this.get_today(1);
                this.log = "";

            },
            submit_log:function(){//提交拜访日志
    	        let that = this;
    	        let params = {
    	            id:that.write_log.user_id,
                    log:that.log
                }
                this.axios.post(baseUrl+"/write_log",params).then(function(res) {
                    if(res.data.success){
                        if(res.data.response.code==1){
                            that.$message({
                                type: 'success',
                                message: res.data.response.msg
                            });
                            that.write_log.centerDialogVisible = false;
                            that.initTbl(1,that.number)
                        }else{
                            that.$notify.error({
                                title: '错误',
                                message: "好像出了点问题。请再试一次"
                            });
                        }
                    }
                });
            },
            search_customer:function(){//填写拜访日志搜索客户
    	        let that = this;
    	        let params = {
    	            search_contnt:that.write_log.search_cnt
                }
                this.axios.post(baseUrl+"/search_customer",params).then(function(res) {
                    if(res.data.success){
                        if(res.data.response.code==1){
                            if(res.data.response.data!==0){
                                let data = []
                                for(let i = 0;i<res.data.response.data.length;i++){
                                    data.push({value:res.data.response.data[i].id,label:res.data.response.data[i].name})
                                }
                                that.search_list = data;
                                that.search_list_status = true;
                            }
                        }
                    }
                });
            },
            statistics_log:function(){//统计数据。
    	        let that = this;
                this.axios.post(baseUrl+"/statistics_log",).then(function(res) {
                    if(res.data.success){
                        if(res.data.response.code==1){
                            that.week_number = res.data.response.data.last_week;
                            that.month_number = res.data.response.data.month;
                            that.add_user = res.data.response.data.add_user;
                        }
                    }
                });
            },
            get_chart_data:function(){
    	        let that = this;
    	        let params = {
    	            frq:that.chart_frq,
    	            start_date:null,
                    end_date:null
                }
                this.axios.post(baseUrl+"/statistics_chart",params).then(function(res) {
                    if(res.data.success){
                        that.categories=res.data.response.data.dates;
                        that.series=[{name:"拜访客户数",data:res.data.response.data.value}]
                        console.log(that.series)
                    }
                });
            },
		}
    }
</script>

<style lang="less">
    @import '../style/common';
	@import '../style/mixin';
    .checkbtn{
        width: 120px;
        height: 32px;
        line-height: 1.6;
        background: #F6F6F6;
        border-radius: 2px;
    }
    .checkbtn.active{
        background-color: #369FFF;
        color: #fff;
    }

    .el-form-item{
        margin-bottom: 12px;
    }


    .sbox-module{
        display: flex;
        box-shadow: 0 1px 4px 0 rgb(209,209,209,0.50);
        flex: 1;
        margin: 0 15px;
        height: 140px;
        .left-cnt{
            flex: 2;
            padding-left: 50px;
            padding-top: 35px;
            height: 105px;
            .number{
                display: block;
                font-size: 40px;
                color: #151515;
                letter-spacing: 1.78px;
                line-height: 40px;
            }
            .title{
                margin-top: 24px;
                display: block;
                opacity: 0.6;
                font-size: 14px;
                color: #333333;
                line-height: 14px;
            }
        }
        .right-cnt{
            flex: 1;
            height: 140px;
            text-align: center;
            .data-icon{
                margin-top:50px;
            }
        }
    }

    .el-dialog__footer{
        text-align: center;
    }
</style>

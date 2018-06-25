<template>
    <el-row>
        <el-col :span="22" :offset="1" style="padding-top: 20px">
            <!--主要的信息-->
            <div v-if="state==='main'">
                <ul class="usermanager-header">
                    <li @click="toggleMain('all')" :class="{active:state2=='all'}">
                        全部用户（{{alltale_total1}}）
                    </li>
                    <li @click="toggleMain('new')" :class="{active:state2=='new'}">
                        新注册用户（{{alltale_total2}}）
                    </li>
                    <li @click="toggleMain('pass')" :class="{active:state2=='pass'}">
                        已过期用户（{{alltale_total3}}）
                    </li>
                </ul>
                <div class="mtop40">
                    <!--全部用户-->
                    <div v-show="state2==='all'" class="box-module">
                        <div>
                            <button class="btn btn-main middle-btn" @click="toggle('application_account')" type="button">账号申请</button>
                            <button class="btn btn-main middle-btn mleft20" @click="toggle('stats')" type="button">统计数据</button>
                            <el-input class="search-cnt" placeholder="请输入内容" v-model="search_cnt1">
                                <template slot="append">
                                    <el-button class="search-btn" @click="initTbl('1','all','10');" type="primary">搜索</el-button>
                                </template>
                            </el-input>
                        </div>

                            <el-table :data="table_data1" :reserve-selection="true" style="display: block;margin-top: 20px;text-align: center">
                                <el-table-column prop="number" label="序号" width="120"></el-table-column>
                                <el-table-column prop="mobile" label="手机号码" width="130"></el-table-column>
                                <el-table-column prop="company" label="所属公司"></el-table-column>
                                <el-table-column prop="real_name" label="姓名" width="130"></el-table-column>
                                <el-table-column prop="create_time" sortable=true :formatter="dateFormat" label="注册日期" width="130"></el-table-column>
                                <el-table-column prop="apply" :formatter="applyPrc" label="申请产品"></el-table-column>
                                <el-table-column prop="operation" label="用户状态"></el-table-column>
                                <el-table-column prop="status" :formatter="auditStatus" label="审核状态"></el-table-column>
                                <el-table-column prop="status" :formatter="accountStatus" label="账号状态"></el-table-column>
                            </el-table>
                            <div class="block mtop20">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage1"
                                    :page-sizes="[10, 20, 50,]"
                                    :page-size="table_attr.number1"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=alltale_total1>
                                </el-pagination>
                            </div>

                    </div>
                    <!--新注册用户-->
                    <div v-show="state2==='new'" class="box-module">
                        <div style="height: 34px">
                            <el-input class="search-cnt" placeholder="请输入内容" v-model="search_cnt2">
                                <template slot="append">
                                    <el-button class="search-btn" @click="initTbl('1','new','10');" type="primary">搜索</el-button>
                                </template>
                            </el-input>
                        </div>
                        <div style="margin-top: 20px">
                            <el-table :data="table_data2" style="display: block;margin-top: 20px;text-align: center">
                                <el-table-column prop="number" label="序号" width="120"></el-table-column>
                                <el-table-column prop="mobile" label="手机号码" width="130"></el-table-column>
                                <el-table-column prop="company" label="所属公司"></el-table-column>
                                <el-table-column prop="real_name" label="姓名" width="130"></el-table-column>
                                <el-table-column prop="create_time" sortable=true :formatter="dateFormat" label="注册日期" width="130"></el-table-column>
                                <el-table-column prop="apply" :formatter="applyPrc" label="申请产品"></el-table-column>
                                <el-table-column label="用户状态">
                                    <template slot-scope="scope">
                                            <p>新注册</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" :formatter="accountStatus" label="账号状态"></el-table-column>
                                <el-table-column prop="status" :formatter="auditStatus" label="审核状态"></el-table-column>
                            </el-table>
                            <div class="block mtop20">
                                <el-pagination
                                    @size-change="handleSizeChange2"
                                    @current-change="handleCurrentChange2"
                                    :current-page="currentPage2"
                                    :page-sizes="[10, 20, 50,]"
                                    :page-size="table_attr.number2"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=alltale_total2>
                                </el-pagination>
                            </div>
                        </div>

                    </div>
                    <!--已过期用户-->
                    <div v-show="state2==='pass'" class="box-module">
                        <div>
                            <button class="btn btn-main middle-btn" @click="applicationExtension('more')" type="button">批量提交审核</button>
                            <el-input class="search-cnt" placeholder="请输入内容" v-model="search_cnt3">
                                <template slot="append">
                                    <el-button class="search-btn" @click="initTbl('1','pass','10');" type="primary">搜索</el-button>
                                </template>
                            </el-input>
                        </div>
                        <section>
                            <el-table :data="table_data3" style="width: 100%;margin-top: 20px;text-align: center" @selection-change="changeFun">
                                <el-table-column type="selection" width="55" @selection-change="changeFun">

                                </el-table-column>
                                <el-table-column prop="number" label="序号" width="120"></el-table-column>
                                <el-table-column prop="mobile" label="手机号码" width="130"></el-table-column>
                                <el-table-column prop="company" label="所属公司"></el-table-column>
                                <el-table-column prop="real_name" label="姓名" width="130"></el-table-column>
                                <el-table-column prop="create_time" sortable=true :formatter="dateFormat" label="注册日期" width="130"></el-table-column>
                                <el-table-column prop="apply" :formatter="applyPrc" label="申请产品"></el-table-column>
                                <el-table-column prop="operation" label="用户状态"></el-table-column>
                                <el-table-column prop="status" label="账号状态">
                                    <template slot-scope="scope">
                                        <p>已过期</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="applicationExtension('single',scope.row['id'],scope.row['apply_status'])" v-if="scope.row.apply_status==1">延期一次</el-button>
                                        <el-button type="text" size="small" @click="applicationExtension('single',scope.row['id'],scope.row['apply_status'])" v-else-if="scope.row.apply_status==2">延期二次</el-button>
                                        <el-button type="text" size="small" @click="applicationExtension('single',scope.row['id'],scope.row['apply_status'])" v-else-if="scope.row.apply_status==3">延期三次</el-button>
                                        <el-button type="text" size="small" @click="applicationExtension('single',scope.row['id'],scope.row['apply_status'])" v-else>申请延期</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block mtop20">
                                <el-pagination
                                    @size-change="handleSizeChange3"
                                    @current-change="handleCurrentChange3"
                                    :current-page="currentPage3"
                                    :page-sizes="[10, 20, 50,]"
                                    :page-size="table_attr.number3"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=alltale_total3>
                                </el-pagination>
                            </div>
                        </section>
                        </div>

                </div>
            </div>
            <!--账号申请-->
            <div v-else-if="state==='application_account'">
                <el-row style="margin-top: 40px;">
                    <el-col :span="24">
                        <div class="user-info-title">
                            <i @click="toggle('main')" class="el-icon-arrow-left"></i>
                            <span class="mleft20">账号申请</span>
                        </div>
                    </el-col>
                    <el-form :model="userinfo1" :rules="rules1" ref="userinfo1">
                        <el-col class="box-module mtop40" :span="24">
                        <el-col :span="12" class="mtop20 center" style="border-right: 2px solid #DFDFDF;">
                            <div style="width: 340px;display: inline-block;">
                                    <el-form-item prop="real_name">
                                        <p class="left">姓名：</p>
                                        <el-input v-model="userinfo1.real_name" placeholder="姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="mobile">
                                        <p class="left">手机号码：</p>
                                        <el-input v-model="userinfo1.mobile" placeholder="手机号" ></el-input>
                                    </el-form-item>
                                    <el-form-item prop="company">
                                        <p class="left">所属公司：</p>
                                        <el-input v-model="userinfo1.company"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <p class="left">所属客户经理：</p>
                                        <el-select class="selected" v-model="userinfo1.account_manager" clearable
                                                   placeholder="请选择">
                                            <el-option
                                                v-for="item in origin"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="user_status">
                                        <p class="left">用户状态：</p>
                                        <el-select class="selected" v-model="userinfo1.user_status" clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in status_op"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <p class="left">账号申请日期</p>
                                        <el-date-picker
                                            v-model="userinfo1.creat_time"
                                            type="date"
                                            placeholder="选择日期" style="width: 340px">
                                        </el-date-picker>
                                        <span style="color: red;font-size: 12px;">此处备注：默认为填写当天日期</span>
                                    </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12" class="mtop20 center">
                            <div style="width: 340px;display: inline-block;">
                                    <el-form-item prop="effective_day">
                                        <p class="left">账号有效期<span>（当前账号权限7天）</span></p>
                                        <el-input v-model="userinfo1.effective_day"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <p style="height: 40px"><span class="left">申请产品</span></p>
                                        <el-checkbox-group v-model="userinfo1.apply_product" style="text-align: left">
                                            <el-checkbox label="FOF Easy"></el-checkbox>
                                            <el-checkbox label="FOF Power"></el-checkbox>
                                            <el-checkbox label="数据库"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item>
                                        <p class="left">名片信息：</p>
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

                        <el-col :span="24" class="mtop40 center">
                            <el-button class="btn btn-main" @click="submitForm('userinfo1')" style="width:400px;height: 40px;">提交审核</el-button>
                        </el-col>
                    </el-col>
                    </el-form>
                </el-row>
            </div>
            <!--统计数据-->
            <div v-else-if="state==='stats'">
                <div class="user-info-title">
                    <i @click="toggle('main')" class="el-icon-arrow-left"></i>
                    <span class="mleft20">用户信息</span>
                </div>
                <static-cnt>

                </static-cnt>
            </div>
        </el-col>
    </el-row>
</template>

<script>

    import dtime from 'time-formater'
    import staticCnt from './statisticalAnalysis'
    import {baseUrl} from "../config/env";
    export default {
        data() {
            return {
                state: "application_account",
                state2: "all",
                currentPage1: 1,
                note: "",
                currentPage2: 1,
                currentPage3: 1,
                alltale_total1: 1232,
                is_have_card: false,
                table_data1: [],
                table_data2: [],
                table_data3: [],
                value4: "",
                ownedmanager: "",
                userinfo1: {
                    real_name:"",
                    mobile: "",
                    company: "",
                    account_manager:"",
                    user_status:null,
                    creat_time:"",
                    effective_day:7,
                    apply_product:[],
                    Card_img:"",
                    remarks:"",
                    multipleSelection:[],
                },
                origin: [{
                    value: 'admin',
                    label: '管理员'
                }],
                belong: [{
                    value: 'admin',
                    label: '管理员'
                }],
                ownedmanager: [{
                    value: '11',
                    label: '某某某'
                }],
                status_op: [
                    {label:"新注册",value: 0},
                    {label:"试用用户",value: 1},
                    {label:"付费用户",value: 2}
                ],
                rules1: {
                    real_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'}
                    ],
                    company: [
                        {required: true, message: '请输入公司', trigger: 'blur'}
                    ],
                    effective_day: [
                        {required: true, message: '请输入账号有效期', trigger: 'blur'},
                    ],

                },
                search_cnt1: "",
                search_cnt2: "",
                search_cnt3: "",
                table_data2: [],
                alltale_total2: 31,
                alltale_total3: 630,
                table_attr:{
                    page1:1,
                    number1:10,
                    page2:1,
                    number2:10,
                    page3:1,
                    number3:10,
                },
                multipleSelection:[],

            }
        },
        components: {
            staticCnt
        },
        mounted() {
            this.initTbl('1','all','10');
            this.initTbl('1','new','10');
            this.initTbl('1','pass','10');
        },
        computed: {},
        methods: {
            toggle: function (params) {
                this.state = params;
            },
            toggleMain: function (params) {
                this.state2 = params;
                this.initTbl(1,params,10);
            },
            handleSizeChange(val) {
                let data = this.table_attr;
                data.number1 = val
                this.initTbl(data.page1,"all",val);
            },
            handleCurrentChange(val) {
                let data = this.table_attr;
                data.page1 = val
                this.initTbl(val,"all",data.number1);
            },
            handleSizeChange2(val) {
                let data = this.table_attr;
                data.number2 = val
                this.initTbl(data.page2,"new",val);
            },
            handleCurrentChange2(val) {
                let data = this.table_attr;
                data.page2 = val;
                this.initTbl(val,"new",data.number2);
            },
            handleSizeChange3(val) {
                let data = this.table_attr;
                data.number3 = val;
                this.initTbl(data.page3,"pass",val);
            },
            handleCurrentChange3(val) {
                let data = this.table_attr;
                data.page3 = val
                this.initTbl(val,"pass",data.number3);
            },
            initTbl: function (page, type, number) {
                let that = this;
                let search_cnt = "";
                switch (type){
                    case "all":
                        search_cnt = that.search_cnt1;
                        break
                    case "new":
                        search_cnt = that.search_cnt2;
                        break
                    case "pass":
                        search_cnt = that.search_cnt3;
                        break
                    default:
                        search_cnt = that.search_cnt1;

                }
                let params = {
                    per_page: number,
                    type: type,
                    page: page,
                    search_content:search_cnt
                }

                this.axios.post(baseUrl+"/search_table",params).then(function(res) {
                    if(res.data.success){
                        if(res.data.response.code==1){
                            let data = res.data.response.data;
                            if(type=="all"){
                                that.table_data1 = that.add_number(number,page,data);
                                that.alltale_total1 = res.data.response.total;
                            }else if(type=="new"){
                                that.table_data2 = that.add_number(number,page,data);
                                that.alltale_total2 = res.data.response.total;
                            }else{
                                that.table_data3 = that.add_number(number,page,data);
                                that.alltale_total3 = res.data.response.total;
                            }
                        }
                    }
                });
            },
            add_number:function(number,page,data){
                for(var i = 0;i<data.length;i++){
                    data[i].number = (number*(page-1))+1+i;
                }
                return data
            },
            //时间格式化
            dateFormat:function(row, column) {
                var date = row["create_time"];
                if (date == "undefined") {
                    return "--";
                }else{
                    return this.formatterDate(row["create_time"]);
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
            applyPrc:(row)=>{
                let val = row["apply"]

                if (val == "undefined" || val ==null) {
                    return "--";
                }else{
                    switch (val){
                        case 0:
                            return "easy"
                            break;
                        case 1:
                            return "数据库"
                            break;
                        case 2:
                            return "power"
                            break;
                        case 3:
                            return "数据库"
                            break;
                        default:
                            return "--"
                    }
                }
            },
            auditStatus:(row)=>{
                let val = row["status"]
                if (val == "undefined" || val == null) {
                    return "--";
                }else{

                    switch (val){
                        case "-1":
                            return "审核通过"
                            break;
                        case "0":
                            return "审核通过"
                            break;
                        case "1":
                            return "待审核"
                            break;
                        case "2":
                            return "审核失败"
                            break;
                        default:
                            return "--"
                    }
                }
            },
            accountStatus:(row)=>{
                let val = row["status"]
                if (val == "undefined" || val == null) {
                    return "--";
                }else{
                    switch (val){
                        case "-1":
                            return "停用"
                            break;
                        case "0":
                            return "正常"
                            break;
                        case "1":
                            return "未开通"
                            break;
                        case "2":
                            return "未开通"
                            break;
                        default:
                            return "--"
                    }
                }
            },
            applicationExtension:function(type,id,status){//单个申请延期
                let that = this;
                let params =null;
                if(type=='single'){
                    params = {
                        "add_style":"single",
                        "id":id,
                        "type":status,
                    }
                }else{
                    let ids = [];
                    let statuss = [];
                    for(let i = 0;i<that.multipleSelection.length;i++){
                        ids.push(that.multipleSelection[i].id);
                        statuss.push(that.multipleSelection[i].status);
                    }
                    params = {
                        "add_style":"more",
                        "id":ids,
                        "type":statuss,
                    }
                }
                this.axios.post(baseUrl+"/apply_extension",params).then(function(res) {
                    if(res.data.success){
                        if(res.data.response.code==1){
                            that.$message({
                                message: res.data.response.msg,
                                type: 'success'
                            });
                            that.initTbl(1,"pass",10)
                        }else{
                            that.$message.error(res.data.response.msg);

                        }
                    }else{
                        that.$message.error("发生了异常，请多试几次");
                    }
                });
            },
            changeFun:function(val){
                this.multipleSelection = val;
            },
            changePrc:function(val){
                //this.userinfo2.multipleSelection = val;
            },
           //账号申请
            async submitForm(formName)
            {
                let that = this;
                this.$refs[formName].validate(async (valid) => {
                    let params = null
                    if (valid) {
                        let data = that.userinfo1;
                        //多选框选中的特殊一点
                        let checkbox = data.apply_product;
                        let apply = {"FOF Easy": 0, "FOF Power": 1, "数据库": 2}
                        let checkbox_result = 0;
                        if (checkbox.length == 1) {
                            checkbox_result = apply[checkbox[0]]
                        } else if (checkbox.length == 2) {
                            let result = 0;
                            for (let i = 0; i < checkbox.length; i++) {
                                checkbox_result+=apply[checkbox[i]]+1;
                            }
                        } else {
                            checkbox_result = 6;
                        }
                            params = {
                            real_name: data.real_name,
                            mobile: data.mobile,
                            company: data.company,
                            account_manager: data.account_manager,
                            user_status: data.user_status,
                            creat_time: data.creat_time,
                            effective_day: data.effective_day,
                            apply_product: checkbox_result,
                            remarks: data.remarks,
                        }
                    } else {
                        that.$notify.error({
                            title: '错误',
                            message: '请输入姓名，手机号，所属公司,账号有效期',
                            offset: 100
                        });
                        return false;
                    }

                    this.axios.post(baseUrl+"/account_apply",params).then(function(res) {
                       console.log(res);
                    });
                });
            }

        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    @import '../style/common';

    .usermanager-header {
        width: 100%;
        background: #FAFAFC;
        border: 1px solid #DFDFDF;
        display: flex;
        li {
            background: #FFFFFF;
            border-left: 1px solid #ECEAED;
            border-right: 1px solid #ECEAED;
            width: 160px;
            cursor: pointer;
            height: 38px;
            line-height: 2.6;
            text-align: center;
            font-size: 14px;
        }
        li.active {
            color: #5EA3C5;
            border-left: none;
            border-right: none;
            border-bottom: 2px solid #5EA3C5;
        }
    }

</style>

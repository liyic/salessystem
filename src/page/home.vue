<template>
    <el-row>
        <el-col :span="22" :offset="1" style="padding-top: 20px">
            <!--主要的信息-->
            <div v-if="state==='main'">
                <ul class="usermanager-header">
                    <li :class="{active:state2=='all'}">
                        全部用户（1200）
                    </li>
                    <li :class="{active:state2=='new'}">
                        新注册用户（20）
                    </li>
                    <li :class="{active:state2=='pass'}">
                        已过期用户（15）
                    </li>
                </ul>
                <div class="mtop40">
                    <!--全部用户-->
                    <div v-if="state2==='all'" class="box-module">
                        <div>
                            <button class="btn btn-main middle-btn" type="button">账号申请</button>
                            <button class="btn btn-main middle-btn mleft20" type="button">统计数据</button>
                            <el-input class="search-cnt" placeholder="请输入内容" v-model="search_cnt">
                                <template slot="append"><el-button class="search-btn" type="primary">搜索</el-button></template>
                            </el-input>
                        </div>
                        <div class="mtop40">
                            <el-table
                                :data="table_data"
                                style="width: 100%;margin-top: 20px;text-align: center">
                                <el-table-column
                                    prop="number"
                                    label="序号"
                                    width="120">
                                </el-table-column>
                                <el-table-column
                                    prop="phone_number"
                                    label="手机号码"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="owned_company"
                                    label="所属公司"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="duties"
                                    label="注册日期"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="date"
                                    label="申请产品"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="operation"
                                    label="用户状态"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="operation"
                                    label="审核状态"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="operation"
                                    label="账号状态"
                                >
                                </el-table-column>
                            </el-table>
                            <div class="block mtop20">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage4"
                                    :page-sizes="[10, 20, 50,]"
                                    :page-size="10"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=alltale_total>
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <!--新注册用户-->
                    <div v-else-if="state2==='new'" class="box-module"></div>
                    <!--已过期用户-->
                    <div v-else-if="state2==='pass'" class="box-module"></div>
                </div>
            </div>
            <!--账号申请-->
            <div v-else-if="state==='application_account'">
                <el-row style="margin-top: 40px;">
                    <el-col :span="22" :offset="1">
                        <div class="user-info-title">
                            <i class="el-icon-arrow-left"></i>
                            <span class="mleft20">用户信息</span>
                        </div>
                    </el-col>
                    <el-col class="box-module mtop40" :span="22" :offset="1">
                        <el-col :span="12" class="mtop20" style="border-right: 2px solid #DFDFDF;">
                            <div style="text-align: center">
                                <el-form class="from1" :model="userinfo1" :rules="rules1" ref="userinfo1">
                                    <el-form-item prop="username">
                                        <p>姓名：</p>
                                        <el-input v-model="userinfo1.username" placeholder="用户名"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <p>手机号码：</p>
                                        <el-input v-model="userinfo1.usercompany"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <p>所属公司：</p>
                                        <el-input v-model="userinfo1.userduties"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <p>所属客户经理：</p>
                                        <el-select class="selected" v-model="customersource" clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in origin"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <p>用户状态：</p>
                                        <el-select class="selected" v-model="user_status" clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in status_op"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <p>账号申请日期</p>
                                        <el-date-picker
                                            v-model="value1"
                                            type="date"
                                            placeholder="选择日期" style="width: 340px">
                                        </el-date-picker>
                                        <span style="color: red;font-size: 12px;">此处备注：默认为填写当天日期</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="12" class="mtop20">
                            <div style="text-align: center">
                                <el-form class="from1" :model="userinfo2" :rules="rules2" ref="userinfo2">
                                    <el-form-item prop="userphone">
                                        <p>账号有效期<span>（当前账号权限7天）</span></p>
                                        <el-input v-model="userinfo2.expiration_date"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <p>申请产品</p>
                                        <el-checkbox-group v-model="checkList">
                                            <el-checkbox label="FOF Easy"></el-checkbox>
                                            <el-checkbox label="FOF Power"></el-checkbox>
                                            <el-checkbox label="数据库"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>

                                    <el-form-item>
                                        <p>名片信息：</p>
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
                                        <p><span>备注信息</span></p>
                                        <el-input type="textarea" ></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <!--统计数据-->
            <div v-else-if="state==='stats'">
                <static-cnt>

                </static-cnt>
            </div>
        </el-col>
    </el-row>
</template>

<script>

	import dtime from 'time-formater'
    import staticCnt from './statisticalAnalysis'
    export default {
    	data(){
    		return {
                state:"stats",
                state2:"all",
                search_cnt:"",
                currentPage1: 5,
                note:"",
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                alltale_total:1232,
                user_status:"",
                is_have_card:false,
                table_data:[
                    {
                        number:"01",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"02",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"03",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"04",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"05",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"06",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"07",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"08",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"09",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                    {
                        number:"10",
                        phone_number:"13301608967",
                        owned_company:"上海琻瑢信息科技有限公司",
                        name:"某某某",
                        duties:"总经理",
                        date:"2018-04-15",
                        operation:"添加拜访日志"
                    },
                ],
                checkList: ['选中且禁用','复选框 A'],
                value1:"",
                value4:"",
                customersource:"",
                ownedmanager:"",
                userinfo1:{
                    username:"",
                    usercompany:"",
                    userduties:"",
                    useremail:"",
                },
                userinfo2:{
                    expiration_date:"7天",
                },
                origin:[{
                    value: 'admin',
                    label: '管理员'
                }],
                belong:[{
                    value: 'admin',
                    label: '管理员'
                }],
                ownedmanager:[{
                    value: '11',
                    label: '某某某'
                }],
                status_op:[
                        {value:"新注册"},
                        {value:"试用用户"},
                        {value:"付费用户"}
                    ],
                rules1: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
    		}
    	},
    	components: {
    	    staticCnt
    	},
    	mounted(){

    	},
        computed: {

        },
    	methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
    @import '../style/common';
    .usermanager-header{
        width: 100%;
        background: #FAFAFC;
        border: 1px solid #DFDFDF;
        display: flex;
        li{
            background: #FFFFFF;
            border-left: 1px solid #ECEAED;
            border-right: 1px solid #ECEAED;
            width: 160px;
            height: 38px;
            line-height: 2.6;
            text-align: center;
            font-size: 14px;
        }
        li.active{
            color:#5EA3C5;
            border-left: none;
            border-right: none;
            border-bottom: 2px solid #5EA3C5;
        }
    }

</style>

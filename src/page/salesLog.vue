<template>
    <!-- 用户表 -->
    <div v-if="state==='main'">
        <el-row class="mtop60">
            <el-col class="box-module" :span="22" :offset="1">
                <div>
                    <el-button class="btn btn-main" type="button">新增潜在客户</el-button>
                    <el-button class="btn btn-main" type="button">填写拜访日志</el-button>
                    <el-button class="btn btn-main" type="text" @click="centerDialogVisible = true">统计数据</el-button>
                    <el-input class="search-cnt" placeholder="请输入内容" v-model="search_cnt">
                        <template slot="append"><el-button class="search-btn" type="primary">搜索</el-button></template>
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
                        prop="phone_number"
                        label="手机号码"
                        width="120">
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
                        label="职务"
                        width="130">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="最近拜访日期"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        label="操作"
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
                        :total=total>
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!-- 对话框 -->
        <el-dialog
            :visible.sync="centerDialogVisible"
            width="34%"
            center="true">
            <h3 style="text-align: center">填写拜访日志</h3>
            <div class="mtop20">
                <span>本次拜访日期：</span>
            </div>
            <div class="mtop20" style="height: 30px;">
                <span class="left" style="line-height: 36px">本次拜访客户：</span>
                <el-input class="search-cnt" style="float: left" placeholder="请输入内容" v-model="search_cnt">
                    <template slot="append">
                        <el-button class="search-btn" type="primary">搜索</el-button>
                    </template>
                </el-input>
                <span class="left mleft20" style="line-height: 36px">添加</span>
            </div>
            <div class="mtop20">
                <span>本次拜访日志</span>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">提交</el-button>
                <el-button @click="centerDialogVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 统计数据 -->
    <div v-else-if="state==='stats'">
        <el-row style="margin-top: 40px;">
            <el-col :span="22" :offset="1">
                <div class="user-info-title">
                    <i class="el-icon-arrow-left"></i>
                    <span class="mleft20">统计数据</span>
                </div>
                <div class="block mtop60" style="display: flex">
                    <div class="sbox-module">
                        <div class="left-cnt">
                            <span class="number">
                                35
                            </span>
                            <span class="title">
                                上周拜访客户数
                            </span>
                        </div>
                        <div class="right-cnt">
                            图1
                        </div>
                    </div>
                    <div class="sbox-module">
                        <div class="left-cnt">
                            <span class="number">
                                180
                            </span>
                            <span class="title">
                                本月拜访客户数
                            </span>
                        </div>
                        <div class="right-cnt">
                            图2
                        </div>
                    </div>
                    <div class="sbox-module">
                        <div class="left-cnt">
                            <span class="number">
                                30
                            </span>
                            <span class="title">
                                本月新增潜在客户数
                            </span>
                        </div>
                        <div class="right-cnt">
                            图3
                        </div>
                    </div>
                </div>
                <div class="block mtop60 box-module">
                    <div class="user-info-title">
                        <span class="mleft20" style="font-size: 14px;">拜访客户数</span>
                    </div>
                    <div class="mtop20">
                        <button class="checkbtn active">最近一个月</button>
                        <button class="checkbtn mleft20">最近三个月</button>
                        <button class="checkbtn mleft20">最近半年</button>
                        <span class="mleft40 f14">区间选择：
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                            </el-date-picker> 至
                            <el-date-picker v-model="value2" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </span>
                    </div>
                    <div class="charts" style="min-height: 300px">

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
                    <el-form class="from1" :model="userinfo1" :rules="rules1" ref="userinfo1">
                        <el-form-item prop="username">
                            <p>姓名：</p>
                            <el-input v-model="userinfo1.username" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <p>所属公司：</p>
                            <el-input v-model="userinfo1.usercompany"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <p>公司职务：</p>
                            <el-input v-model="userinfo1.userduties"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <p>公司邮箱：</p>
                            <el-input v-model="userinfo1.useremail"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <p>客户来源：</p>
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
                            <p>所属客户经理：</p>
                            <el-select class="selected" v-model="ownedmanager" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in belong"
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
                        <el-form-item>
                            <p><span>最近拜访日志：</span><span class="right maincolor">查看更多</span></p>
                            <el-input type="textarea" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
  		</el-row>
    </div>
</template>

<script>

    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
                customersource:"",
                ownedmanager:"",
                note:"",
                value4:"",
                checkList: ['选中且禁用','复选框 A'],
                state:"main",
                search_cnt:"",
                total:1232,
                textarea: '',
                userinfo1:{
                    username:"",
                    usercompany:"",
                    userduties:"",
                    useremail:"",
                },
                value1:"",
                value2:"",
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                centerDialogVisible: false,//模态框参数
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
                userinfo2:{
                    userphone:"",

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
                }]
    		}
    	},
    	components: {

    	},
    	mounted(){

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
    .user-info-title{
        font-size: 18px;
        color: #333333;
        border-bottom:1px solid #DFDFDF;
    }
    .el-form-item{
        margin-bottom: 12px;
    }
    .el-select{
        display: block;
    }
    .from1{
        display: inline-block;
        width:340px ;
        text-align: left;
    }
    .box-module{
        padding: 20px 20px;
        box-shadow: 0 1px 4px 0 rgb(209,209,209,0.50);

        .cell{
            text-align: center;
        }
        .el-table th ,.el-table th>.cell{
            background-color: rgb(75,84,115);
            color: #fff;
        }
        td>.cell{
            font-size: 13px;
        }
        .el-pagination{
            text-align: right;
        }
        .el-pagination__total,.el-pagination__sizes{
            float: left;
        }
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
        }
    }
    .search-cnt{
        float: right;
        width: 340px;
        height: 36px;
        .search-btn{
            background-color: #369FFF !important;
            border-radius: 0px !important;
            border: none !important;
            color: #fff !important;
        }
    }
    .el-dialog__footer{
        text-align: center;
    }
</style>

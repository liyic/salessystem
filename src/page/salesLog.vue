<template>
    <!-- 显示用户信息 -->
    <div>
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
                userinfo1:{
                    username:"",
                    usercompany:"",
                    userduties:"",
                    useremail:"",
                },
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
		}
    }
</script>

<style lang="less">
    @import '../style/common';
	@import '../style/mixin';
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
</style>

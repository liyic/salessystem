<template>
    <div>

        <el-row style="margin-top: 20px;">
            <el-col :span="22" :offset="1">
                <div class="user-info-title">
                    <span>修改密码</span>
                </div>
                <div class="modify-pwd-div">
                    <div class="input-div">
                        <el-form class="from1" :model="pwdinfo" :rules="rules1" ref="userinfo1">
                            <el-form-item prop="origin_pwd">
                                <p>请输入您的原密码</p>
                                <el-input v-model="pwdinfo.origin_pwd" placeholder="用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="new_pwd1">
                                <p>请输入您的新密码</p>
                                <el-input type="password" v-model="pwdinfo.new_pwd1"></el-input>
                            </el-form-item>
                            <el-form-item prop="new_pwd2">
                                <p>请再次确认您的新密码</p>
                                <el-input type="password" v-model="pwdinfo.new_pwd2"></el-input>
                            </el-form-item>
                            <el-form-item prop="new_pwd2">
                                <el-button class="big-btn" type="primary" style="margin-left: 115px">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
  		</el-row>
    </div>
</template>

<script>
    import {getCategory, addCategory, addFood} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
                pwdinfo:{
                    origin_pwd:"",
                    new_pwd1:"",
                    new_pwd2:""
                },
            rules1: {
                    origin_pwd: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    new_pwd1: [
                        { required: true, message: '请输入新的密码', trigger: 'blur' }
                    ],
                    new_pwd2: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' }
                    ]
                },
    		}
    	},
    	components: {

    	},
    	computed: {

    	},
    	methods: {

		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .modify-pwd-div{
        .wh(100%,528px);
        margin-top: 40px;
        background: #FFFFFF;
        box-shadow: 0 1px 4px 0 rgba(209,209,209,0.50);
        padding-top: 120px;
        .input-div{
            width: 360px;
            margin-left: 35%;
        }
    }
</style>

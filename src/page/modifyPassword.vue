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
                                <el-input type="password" v-model="pwdinfo.origin_pwd" placeholder="原密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="new_pwd1">
                                <p>请输入您的新密码</p>
                                <el-input type="password" v-model="pwdinfo.new_pwd1" placeholder="新密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="new_pwd2">
                                <p>请再次确认您的新密码</p>
                                <el-input type="password" v-model="pwdinfo.new_pwd2" placeholder="确认新密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="new_pwd2">
                                <el-button class="big-btn" type="primary" @click="submitForm('userinfo1')" style="margin-left: 115px">保存</el-button>
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
    import {baseUrl} from "../config/env";
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
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    var that = this
                    if (valid) {
                       let old_info = JSON.parse(sessionStorage.getItem("user_info"));
                       if(that.pwdinfo.origin_pwd!=old_info.user_pwd){
                           that.$notify.error({
                               title: '错误',
                               message: '你的原始密码好像不太对',
                               offset: 100
                           });
                       }else{
                           if(that.pwdinfo.new_pwd1!==that.pwdinfo.new_pwd2){
                               that.$notify.error({
                                   title: '错误',
                                   message: '2次密码不一致',
                                   offset: 100
                               });
                           }else{
                               this.axios.post(baseUrl+"/modify_pwd",{
                                   user_name:old_info.user_name,
                                   password:that.pwdinfo.new_pwd1,
                                   type:old_info.user_type,
                               }).then(function(res) {
                                   if (res.data.params.code == 1) {
                                       that.$message({
                                           type: 'success',
                                           message: res.data.params.msg
                                       });
                                       sessionStorage.setItem("user_info",JSON.stringify({user_name:that.loginForm.username,user_pwd:that.pwdinfo.new_pwd1,user_type:that.value4}))
                                   }else{
                                       that.$message({
                                           type: 'error',
                                           message: res.data.params.msg
                                       });
                                   }
                               });                           }
                       }
                    } else {
                        that.$notify.error({
                            title: '错误',
                            message: '请输入正确的原密码和新密码',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
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

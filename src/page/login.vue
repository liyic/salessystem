<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
                    <img src="../assets/img/login/logo.png" alt="">
                    <span>欢迎登录销售管理系统</span>
		  		</div>
		    	<el-form class="from" :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
                        <p>用户名：</p>
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
                        <p>密码：</p>
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
                    <el-form-item>
                        <p>权限：</p>
                        <el-select class="selected" v-model="value4" clearable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="remember-pwd">
                        <el-checkbox>记住密码</el-checkbox>
                    </el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
                options: [{
                    value: 'admin',
                    label: '管理员'
                }, {
                    value: 'supervisor',
                    label: '销售主管'
                }, {
                    value: 'sales',
                    label: '销售人员'
                }],
                value4: ''
			}
		},
		mounted(){
			this.showLogin = true;
			if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			...mapActions(['getAdminData']),
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
						if (res.status == 1) {
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });
							this.$router.push('manage')
						}else{
							this.$message({
		                        type: 'error',
		                        message: res.message
		                    });
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		width: 100%;
		left: 0;
		span{
            position: relative;
            font-size: 28px;
            color: #2F66AB;
            letter-spacing: 1.68px;
            top: -10px;
		}
	}
	.form_contianer{
		.wh(750px, 462px);
		.ctp(320px, 800px);
        opacity: 0.88;
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
        left:30%;
        text-align: center;
        padding: 80px 0;
        .from{
            margin-top: 20px;
            margin-left: 180px;
            width: 390px;
        }
		.submit_btn{
			width: 390px;
			font-size: 18px;
		}
        p{
            text-align: left;
            font-size: 18px;
            color: #5B5B5B;
            letter-spacing: 2px;
            text-align: justify;
        }
        .remember-pwd{
            text-align: left;
        }
        .selected{
            width: 390px;
        }
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
    .fillcontain{
        background:#ffffff url("../assets/img/login/background.png") no-repeat fixed center;
    }
    .logo{

    }
</style>

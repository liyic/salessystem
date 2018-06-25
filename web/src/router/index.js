import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const saleslog = r => require.ensure([], () => r(require('@/page/salesLog')), 'salesLog');
const modifypassword = r => require.ensure([], () => r(require('@/page/modifyPassword')), 'modifyPassword');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/salesLog',
			component: saleslog,
			meta: ['销售日志'],
		},{
			path: '/modifyPassword',
			component: modifypassword,
			meta: ['修改密码'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

import fetch from '@/config/fetch'
/**
 * 登陆
 */

export const login = data => fetch('/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/singout');

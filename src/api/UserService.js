// /api/UserService.js
import request from './request';

// 用户登录 API 请求
export function login(email, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            email,
            password,
        },
    });
}

// 用户登出 API 请求
export function logout() {
    return request({
        url: '/user/logout',
        method: 'post',
    });
}

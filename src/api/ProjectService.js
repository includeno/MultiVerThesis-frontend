// /api/ProjectService.js
import request from './request';

// 获取项目列表 API 请求
export function gethProjectsByUserUuid(userUuid) {
    return request({
        url: '/projects',
        method: 'get',
        params: {
            userUuid,
        },
    });
}
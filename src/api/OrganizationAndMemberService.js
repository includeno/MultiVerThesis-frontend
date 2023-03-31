// /api/OrganizationAndMemberService.js
import request from './request';

// 获取组织信息及其成员信息 API 请求
export function getOrganizationsByUserId(userId) {
    return request({
        url: '/organization',
        method: 'get',
        params: {
            userId,
        },
    });
}

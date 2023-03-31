import request from './request';

// 获取组织信息 API 请求
export function getOrganization(organizationId) {
    return request({
        url: '/organization',
        method: 'get',
        params: {
            organizationId,
        },
    });
}

// 添加组织 API 请求
export function addOrganization(name, userId) {
    return request({
        url: '/organization',
        method: 'post',
        data: {
            name,
            userId,
        },
    });
}

// 更新组织 API 请求
export function updateOrganization(organizationId, name, valid) {
    return request({
        url: '/organization',
        method: 'put',
        data: {
            organizationId,
            name,
            valid,
        },
    });
}
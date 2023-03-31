// /api/ProjectService.js
import request from './request';

// 获取项目信息 API 请求
export function getProject(id) {
    return request({
        url: '/project',
        method: 'get',
        params: {
            id,
        },
    });
}

// 添加项目 API 请求
export function addProject(projectName, userId, organizationId) {
    let formdata = new FormData();
    formdata.append("projectName", projectName);
    formdata.append("userId", userId);
    formdata.append("organizationId", organizationId);
    return request({
        url: '/project',
        method: 'post',
        data: formdata,
    });
}

// 更新项目 API 请求
export function updateProject(projectRequest) {
    return request({
        url: '/project',
        method: 'put',
        data: projectRequest,
    });
}

// 获取项目详细信息 API 请求
export function getProjectDetail(uuid) {
    return request({
        url: '/project/detail',
        method: 'get',
        params: {
            uuid,
        },
    });
}

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
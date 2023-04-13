// /api/SectionService.js
import request from './request';

// 获取小节 API 请求
export function getSection(id) {
    return request({
        url: '/section',
        method: 'get',
        params: {
            id,
        },
    });
}

// 创建小节 API 请求
export function addSection(sectionTitle,sectionContent, parentUUID, projectUUID) {
    let formdata = new FormData();
    formdata.append("sectionTitle", sectionTitle);
    formdata.append("sectionContent", sectionContent);
    formdata.append("parentUUID", parentUUID);
    formdata.append("projectUUID", projectUUID);
    console.log("formdata", formdata);
    return request({
        url: '/section',
        method: 'post',
        data: formdata,
    });
}

// /api/request.js
import axios from 'axios';

// 从 Base.js 中获取 BASE_URL
import { BASE_URL } from './Base';

// 创建一个新的 Axios 实例
const request = axios.create({
    baseURL: BASE_URL, // 设置基础 URL
    timeout: 5000, // 设置请求超时时间（毫秒）
    // 在此处添加任何其他配置
});
//
// // 请求拦截器
// request.interceptors.request.use(
//     (config) => {
//         // 在发送请求之前做些什么，例如添加 token 到请求头
//         return config;
//     },
//     (error) => {
//         // 对请求错误做些什么
//         return Promise.reject(error);
//     }
// );
//
// // 响应拦截器
// request.interceptors.response.use(
//     (response) => {
//         // 对响应数据做点什么
//         return response.data;
//     },
//     (error) => {
//         // 对响应错误做点什么
//         return Promise.reject(error);
//     }
// );

// 导出封装好的 Axios 实例
export default request;

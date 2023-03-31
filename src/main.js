import {createApp} from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from "@/routes";

//vuex
import {user} from '@/store/modules/user'; // 引入 user 模块
import {createStore} from 'vuex'
// 创建 Vuex store 实例
const store = createStore({
    modules: {
        // 注册 user 模块
        user: user,
    },
});

const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(store);
app.mount('#app');
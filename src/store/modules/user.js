export const user = {
    namespaced: true, // 使用命名空间，避免不同模块之间的命名冲突
    state: {
        // 用户基础数据的状态
        userInfo: null,
        isLoading: false,
    },
    mutations: {
        // 设置用户基础数据
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo;
            localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(userInfo));
        },
    },
    actions: {
        // 异步获取用户基础数据并提交 mutation
        async fetchUserInfo({commit}) {
            try {
                // 假设此处是获取用户基础数据的 API 请求，根据实际情况调整
                // const response = await axios.get('/api/user/info');
                // 模拟获取用户数据的响应
                const response = {
                    data: {
                        id: '1',
                        uuid: 'user-uuid-1',
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        avatar:'https://vuex.vuejs.org/flow.png',
                    },
                };
                commit('SET_USER_INFO', response.data);
            } catch (error) {
                console.error('获取用户基础数据失败:', error);
            }
        },
    },
    getters: {
        // 获取用户基础数据
        getUserInfo(state) {
            if (!state.userInfo) {
                let data = {
                    id: '1',
                    uuid: 'user-uuid-1',
                    username: 'John Doe',
                    email: 'johndoe@example.com',
                    avatar:'https://vuex.vuejs.org/flow.png',
                }
                localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(data));
                console.log("login response:" + JSON.stringify(data));
                try {
                    const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
                    state.userInfo = JSON.parse(user)
                } catch (e) {
                    console.error(e)
                }
            }
            return state.userInfo;
        },
    },
};

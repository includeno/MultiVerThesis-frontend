<template>
  <div class="project-dropdown">
    <a-dropdown>
      <a-button @click="loadData">
        项目
        <a-icon type="down"/>
      </a-button>
      <template v-if="show" v-slot:overlay>
        <a-menu>
          <a-menu-item
              v-for="project in projects"
              :key="project.projectId"
              @click="handleProjectClick(project.uuid)"
          >
            <router-link :to="{ name: 'project', params: { uuid: project.uuid }}">
              {{ project.projectName }}
              {{ project.uuid }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import {gethProjectsByUserUuid} from "@/api/ProjectService";

export default {
  data() {
    return {
      show: false,
      // 假设从后端获取的项目列表数据
      projects: [
        // {id: 'proj1', name: '项目1'},
        // {id: 'proj2', name: '项目2'},
        // {id: 'proj3', name: '项目3'},
        // ... 更多项目数据
      ],
    };
  },
  mounted() {

  },
  computed: {
    loginUser() {
      return this.$store.getters["user/getUserInfo"]
    },
    isLogining() {
      console.log("read isLoading!" + JSON.stringify(this.$store.state.user.isLoading));
      return this.$store.state.user.isLoading
    },
  },
  methods: {
    loadData() {
      if (this.show === false) {
        this.fetchProjectsByUserUuid(this.loginUser.uuid);
        this.show = true;
      } else {
        this.show = false;
      }
    },
    fetchProjectsByUserUuid(userUuid) {
      // 请求获取工作区数据
      gethProjectsByUserUuid(userUuid).then(response => {
        console.log(response.data)
        // 解析响应数据并更新组件的organizations数据属性
        this.projects = response.data;
      }).catch(error => {
        // 处理错误情况，例如弹窗提示用户
        console.error(error);
      });
    },
    handleProjectClick(uuid) {
      // 在这里处理项目点击事件，例如导航到项目详情页面
      console.log('点击的项目ID:', uuid);
    },
  },
};
</script>

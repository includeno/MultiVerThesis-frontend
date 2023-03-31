<template>
  <div class="app-header">
    <!-- header 的其他内容，例如 logo、导航菜单等 -->
    <div class="header-logo">
      <!-- logo 或应用名称 -->
      <router-link :to="{name:'Home'}">网页写作工具</router-link>
    </div>
    <div class="header-nav">
      <!-- 导航菜单 -->
      <a-menu mode="horizontal">
        <a-menu-item key="1">
          <OrganizationDropdown></OrganizationDropdown>
        </a-menu-item>
        <a-menu-item key="2">
          <ProjectDropdown></ProjectDropdown>
        </a-menu-item>
        <a-menu-item key="3">
          <CreateDropdown></CreateDropdown>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="user">
      <!-- 情景 1：远程加载中 -->
      <span v-if="isLogining">loading...</span>
      <!-- 情景 2：当前有登录用户 -->
      <template v-else-if="loginUser">
        <HeaderAvatar class="avatar"/>
      </template>
      <template v-else>
            <span class="avatar">
              <router-link :to="{name:'Login'}">登录</router-link>
            </span>
      </template>
    </div>

  </div>
</template>

<script>
// 导入项目选择组件
import CreateDropdown from '@/components/CreateDropdown'
import OrganizationDropdown from "@/components/OrganizationDropdown";
import ProjectDropdown from "@/components/ProjectDropdown";
import HeaderAvatar from "@/components/HeaderAvatar";

export default {
  components: {
    OrganizationDropdown,
    ProjectDropdown,
    CreateDropdown,
    HeaderAvatar,
  },
  computed:{
    loginUser() {
      return this.$store.getters["user/getUserInfo"]
    },
    isLogining() {
      console.log("read isLoading!" + JSON.stringify(this.$store.state.user.isLoading));
      return this.$store.state.user.isLoading
    },
  }
}
</script>

<style scoped>
.app-header {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f0f2f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-logo {
  font-size: 20px;
  font-weight: bold;
}

.header-nav {
  flex-grow: 1;
  margin-left: 20px;
}

.header-project-select {
  margin-right: 20px;
}
</style>

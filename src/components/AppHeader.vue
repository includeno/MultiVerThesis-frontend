<template>
  <div class="app-header">
    <!-- header 的其他内容，例如 logo、导航菜单等 -->
    <div class="header-logo">
      <!-- logo 或应用名称 -->
      My Application
    </div>
    <div class="header-nav">
      <!-- 导航菜单 -->
      <a-menu mode="horizontal">
        <a-menu-item key="1">首页</a-menu-item>
        <a-menu-item key="2">文档</a-menu-item>
        <a-menu-item key="3">设置</a-menu-item>
      </a-menu>
    </div>

    <!-- 引入项目选择组件 -->
    <div class="header-project-select">
      <ProjectSelect />
    </div>
  </div>
</template>

<script>
// 导入项目选择组件
import ProjectSelect from '@/components/ProjectSelect.vue'

export default {
  components: {
    ProjectSelect
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

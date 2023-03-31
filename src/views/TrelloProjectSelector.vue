<template>
  <div class="project-dropdown">
    <a-dropdown @visibleChange="handleVisibleChange">
      <a-button @click="handleButtonClick">
        {{ currentProject.project_name }} <a-icon type="down" />
      </a-button>
      <template v-slot:overlay>
        <a-menu class="project-dropdown-menu">
          <div class="search-container">
            <label>搜索项目</label>
            <a-input-search v-model:value="searchText" />
          </div>
          <a-menu-item
              v-for="project in filteredProjects"
              :key="project.project_id"
              @click="handleProjectClick(project)"
          >
            <div class="project-item">
              <div class="project-name">{{ project.project_name }}</div>
              <div class="project-description">{{ project.description }}</div>
              <div class="project-uuid">{{ project.uuid }}</div>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'TrelloProjectSelector',
  data() {
    return {
      // 假设从后端获取的项目列表数据
      projects: [
        { project_id: 1, project_name: '项目1', description: '描述1',uuid:'12345654321234' },
        { project_id: 2, project_name: '项目2', description: '描述2',uuid:'234567654345678765' },
        { project_id: 3, project_name: '项目3', description: '描述2',uuid:'234567654345678765' },
        { project_id: 4, project_name: '项目4', description: '描述2',uuid:'234567654345678765' },
        { project_id: 5, project_name: '项目5', description: '描述2',uuid:'234567654345678765' },
        { project_id: 6, project_name: '项目6', description: '描述2',uuid:'234567654345678765' },
        { project_id: 7, project_name: '项目7', description: '描述2',uuid:'234567654345678765' },
        { project_id: 8, project_name: '项目8', description: '描述2',uuid:'234567654345678765' },

        // ... 更多项目数据
      ],
      // 当前选中的项目
      currentProject: null,
      // 搜索文本
      searchText: '',
    };
  },
  computed: {
    // 根据搜索文本过滤项目列表
    filteredProjects() {
      return this.projects.filter((project) =>
          project.project_name.includes(this.searchText)
      );
    },
  },
  methods: {
    fetchProjects(){

    },
    // 处理下拉面板可见性变化
    handleVisibleChange(visible) {
      console.log(visible);
      // if (!visible) {
      //   this.searchText = ''; // 清空搜索文本
      // }
    },
    // 处理下拉按钮点击事件
    handleButtonClick() {
      // 在这里处理额外的逻辑，例如获取项目列表数据
    },
    // 处理项目点击事件
    handleProjectClick(project) {
      this.currentProject = project;
      // 在这里处理项目切换的逻辑
      this.$router.push({ path: '/project', query: { uuid: project.uuid } });
    },
  },
  created() {
    // 初始化时设置默认选中的项目
    this.currentProject = this.projects[0];
  },
};
</script>

<style scoped>
.project-dropdown-menu {
  width: 300px; /* 定义下拉面板宽度 */
}

.search-container {
  padding: 8px;
}

.project-item {
  padding: 8px;
}

.project-name {
  font-weight: bold;
}

.project-description {
  color: #888;
  font-size: 12px;
}
</style>

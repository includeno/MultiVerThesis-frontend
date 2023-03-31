<template>
  <div class="create-dropdown">
    <a-dropdown>
      <a-button>
        创建 <a-icon type="down" />
      </a-button>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="showCreateOrganizationModal">
            创建工作区
          </a-menu-item>
          <a-menu-item @click="showCreateProjectModal">
            创建项目
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <!-- 创建工作区的模态框 -->
    <a-modal
        title="创建工作区"
        :visible="createOrganizationModalVisible"
        @cancel="hideCreateOrganizationModal"
        @ok="createOrganization"
    >
      <a-input v-model="newOrganizationName" placeholder="工作区名称" />
    </a-modal>

    <!-- 创建项目的模态框 -->
    <a-modal
        title="创建项目"
        :visible="createProjectModalVisible"
        @cancel="hideCreateProjectModal"
        @ok="createProject"
    >
      <a-input v-model="newProjectName" placeholder="项目名称" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name:"CreateDropdown",
  data() {
    return {
      createOrganizationModalVisible: false,
      createProjectModalVisible: false,
      newOrganizationName: '',
      newProjectName: '',
    };
  },
  methods: {
    showCreateOrganizationModal() {
      this.createOrganizationModalVisible = true;
    },
    hideCreateOrganizationModal() {
      this.createOrganizationModalVisible = false;
      this.newOrganizationName = '';
    },
    createOrganization() {
      // 在这里处理创建组织的逻辑
      console.log('创建工作区:', this.newOrganizationName);
      this.hideCreateOrganizationModal();
    },
    showCreateProjectModal() {
      this.createProjectModalVisible = true;
    },
    hideCreateProjectModal() {
      this.createProjectModalVisible = false;
      this.newProjectName = '';
    },
    createProject() {
      // 在这里处理创建项目的逻辑
      console.log('创建项目:', this.newProjectName);
      this.hideCreateProjectModal();
    },
  },
};
</script>

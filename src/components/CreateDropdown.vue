<template>
  <div class="create-dropdown">
    <a-dropdown>
      <a-button>
        创建
        <a-icon type="down"/>
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
      <a-input v-model:value="newOrganizationName" placeholder="工作区名称"/>
    </a-modal>

    <!-- 创建项目的模态框 -->
    <a-modal
        title="创建项目"
        :visible="createProjectModalVisible"
        @cancel="hideCreateProjectModal"
        @ok="createProject"
    >
      <a-input v-model:value="newProjectName" placeholder="项目名称"/>
      <OrganizationSelect ref="createProjectModal" @update-select-organization="onSelectOrganization"></OrganizationSelect>
    </a-modal>
  </div>
</template>

<script>
import {addOrganization} from '@/api/OrganizationService'
import {addProject} from '@/api/ProjectService'
import OrganizationSelect from "@/components/OrganizationSelect";

export default {
  name: "CreateDropdown",
  components: {OrganizationSelect},
  data() {
    return {
      createOrganizationModalVisible: false,
      createProjectModalVisible: false,
      newOrganizationName: '',
      newProjectName: '',
      organizationId:'',
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters["user/getUserInfo"]
    },
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
      addOrganization(this.newOrganizationName, this.loginUser.id).then(response => {
        console.log(response.data)
      }).catch(error => {
        // 处理错误情况，例如弹窗提示用户
        console.error(error);
      });
      this.hideCreateOrganizationModal();
    },
    showCreateProjectModal() {
      this.createProjectModalVisible = true;
    },
    hideCreateProjectModal() {
      this.createProjectModalVisible = false;
      this.newProjectName = '';
      this.$refs.createProjectModal.reset(); // 调用子组件的重置方法
    },
    createProject() {
      // 在这里处理创建项目的逻辑
      console.log('创建项目:', this.newProjectName);
      addProject(this.newProjectName, this.loginUser.id,this.organizationId).then(response => {
        console.log("addProject");
        console.log(response.data);
        this.hideCreateProjectModal();
      }).catch(error => {
        // 处理错误情况，例如弹窗提示用户
        console.error(error);
      });
    },
    onSelectOrganization(organizationId){
      console.log("onSelectOrganization:"+organizationId);
      this.organizationId=organizationId;
    }
  },
};
</script>

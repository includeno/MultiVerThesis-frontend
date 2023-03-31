<template>
  <div class="navbar-dropdown">
    <a-dropdown>
      <a-button @click="loadData">
        工作区
        <a-icon type="down"/>
      </a-button>
      <template v-if="show" v-slot:overlay>
        <a-menu>
          <a-menu-item
              v-for="organization in organizations"
              :key="organization.organizationId"
              @click="handleOrganizationClick(organization.organizationId)"
          >
            {{ organization.name }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import {getOrganizationsByUserId} from '@/api/OrganizationAndMemberService'

export default {
  name: "OrganizationDropdown",
  data() {
    return {
      show:false,
      // 假设从后端获取的工作区列表数据
      organizations: [
        // {id: 'org1', name: '工作区1'},
        // {id: 'org2', name: '工作区2'},
        // {id: 'org3', name: '工作区3'},
        // ... 更多工作区数据
      ],
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters["user/getUserInfo"];
    },
    isLogining() {
      console.log("read isLoading!" + JSON.stringify(this.$store.state.user.isLoading));
      return this.$store.state.user.isLoading;
    },
  },
  mounted() {

  },
  methods: {
    loadData(){
      if(this.show===false){
        this.fetchOrganizationByUserId(this.loginUser.id);
        this.show=true;
      }
      else{
        this.show=false;
      }
    },
    fetchOrganizationByUserId(userId) {
      // 请求获取工作区数据
      getOrganizationsByUserId(userId).then(response => {
        console.log(response.data)
        // 解析响应数据并更新组件的organizations数据属性
        this.organizations = response.data.map(item => {
          // 合并成员信息和组织信息到一个对象中
          return {
            ...item.organization,
            members: item.members
          };
        });
      }).catch(error => {
        // 处理错误情况，例如弹窗提示用户
        console.error(error);
      });
    },
    handleOrganizationClick(orgId) {
      // 在这里处理工作区点击事件，例如导航到工作区详情页面
      console.log('点击的工作区ID:', orgId);
    },
  },
};
</script>

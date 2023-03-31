<template>
  <div>
    <!-- 下拉菜单展示组织列表 -->
    <a-select
        v-model="selectedOrganizationId"
        placeholder="请选择组织"
        @change="handleOrganizationChange"
    >
      <a-select-option
          v-for="org in organizations"
          :key="org.organizationId"
          :value="org.organizationId"
      >
        {{ org.name }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import {getOrganizationsByUserId} from "@/api/OrganizationAndMemberService";

export default {
  name:"OrganizationSelect",
  data() {
    return {
      organizations: [], // 组织列表
      selectedOrganizationId: null, // 当前选中的组织ID
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters["user/getUserInfo"]
    },
  },
  methods: {
    // 获取组织列表的方法，此处模拟数据，实际应从后端接口获取
    fetchOrganizations() {
      getOrganizationsByUserId(this.loginUser.id).then(response => {
        console.log(response.data)
        this.organizations=response.data.map(item => {
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
    // 处理组织切换
    handleOrganizationChange(organizationId) {
      this.selectedOrganizationId = organizationId;
      this.$emit('update-select-organization', organizationId);
    },
    reset() {
      this.selectedOrganizationId = null;
    }
  },
  mounted() {
    // 初始化时获取组织列表
    this.fetchOrganizations();
  },
};
</script>

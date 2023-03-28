<template>
  <div>
    <!-- 下拉菜单展示项目列表 -->
    <a-select
        v-model="selectedProjectId"
        placeholder="请选择项目"
        @change="handleProjectChange"
    >
      <a-select-option
          v-for="project in projects"
          :key="project.project_id"
          :value="project.project_id"
      >
        {{ project.project_name }}
      </a-select-option>
    </a-select>

<!--    &lt;!&ndash; 表单展示所选项目的详细信息 &ndash;&gt;-->
<!--    <a-form v-if="selectedProject">-->
<!--      <a-form-item label="项目ID">-->
<!--        {{ selectedProject.project_id }}-->
<!--      </a-form-item>-->
<!--      <a-form-item label="项目名称">-->
<!--        {{ selectedProject.project_name }}-->
<!--      </a-form-item>-->
<!--      <a-form-item label="项目描述">-->
<!--        {{ selectedProject.description }}-->
<!--      </a-form-item>-->
<!--    </a-form>-->
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
  setup() {
    const projects = ref([]) // 项目列表
    const selectedProjectId = ref(null) // 当前选中的项目ID
    const selectedProject = ref(null) // 当前选中的项目详细信息

    // 获取项目列表的方法，此处模拟数据，实际应从后端接口获取
    const fetchProjects = () => {
      projects.value = [
        { project_id: 1, project_name: '项目1', description: '项目1描述' },
        { project_id: 2, project_name: '项目2', description: '项目2描述' },
        // ...其他项目数据
      ]
    }

    // 监听选中项目ID的变化，更新选中项目的详细信息
    watchEffect(() => {
      selectedProject.value = projects.value.find(
          (project) => project.project_id === selectedProjectId.value
      )
    })

    // 初始化时获取项目列表
    fetchProjects()

    // 处理项目切换
    const handleProjectChange = (projectId) => {
      selectedProjectId.value = projectId
    }

    return {
      projects,
      selectedProjectId,
      selectedProject,
      handleProjectChange
    }
  }
}
</script>

<template>
  <div>
    <!-- 项目选择组件 -->
    <div class="project-select">
      <ProjectSelect @project-change="handleProjectChange" />
    </div>

    <!-- 树形控件展示 section 和 paragraph 列表 -->
    <a-tree
        :tree-data="treeData"
        :default-expand-all="true"
        replace-fields="{title: 'name', key: 'id'}"
    />
  </div>
</template>

<script>
import ProjectSelect from './ProjectSelect.vue'

export default {
  name: 'TreeDisplay',
  components: {
    ProjectSelect
  },
  data() {
    return {
      treeData: []
    }
  },
  mounted() {
    this.treeData=this.fetchSectionsAndParagraphs();
  },
  methods: {
    // 模拟从后端获取 section 和 paragraph 数据的方法
    fetchSectionsAndParagraphs() {
      // 此处模拟数据，实际应从后端接口获取
      return [
        {
          id: 'section-1',
          name: '章节1',
          type:'section',
          children: [
            { id: 'paragraph-1-1', name: '段落1-1' },
            { id: 'paragraph-1-2', name: '段落1-2' }
          ]
        },
        {
          id: 'section-2',
          name: '章节2',
          children: [
            { id: 'paragraph-2-1', name: '段落2-1' },
            { id: 'paragraph-2-2', name: '段落2-2' }
          ]
        }
        // ...其他章节和段落数据
      ]
    },
    // 处理项目更改
    handleProjectChange(projectId) {
      // 根据选中的项目ID获取对应的 section 和 paragraph 数据
      this.treeData = this.fetchSectionsAndParagraphs(projectId)
    }
  }
}
</script>

<style scoped>
.project-select {
  margin-bottom: 20px;
}
</style>

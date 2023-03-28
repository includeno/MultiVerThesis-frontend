<template>
  <div>
    <!-- 项目选择组件 -->
    <div class="project-select">
      <ProjectSelect @project-change="handleProjectChange" />
    </div>

    <!-- 折叠面板展示 section 和 paragraph 列表 -->
    <a-collapse>
      <a-collapse-panel
          v-for="section in sections"
          :key="section.key"
          :header="section.title"
      >
        <!-- 渲染 section 内容 -->
        <div v-if="section.children" class="nested-sections">
          <a-collapse>
            <a-collapse-panel
                v-for="subSection in section.children"
                :key="subSection.key"
                :header="subSection.title"
            >
              {{ subSection.content }}
            </a-collapse-panel>
          </a-collapse>
        </div>
        <div v-else>
          {{ section.content }}
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import ProjectSelect from './ProjectSelect.vue'

export default {
  name: 'ContentDisplay',
  components: {
    ProjectSelect
  },
  data() {
    return {
      sections: [] // 存储 section 数据
    }
  },
  mounted() {
    this.sections=this.fetchSectionsAndParagraphs();
  },
  methods: {
    handleProjectChange() {
      // 根据选中的项目ID获取对应的 section 和 paragraph 数据
      this.sections = this.fetchSectionsAndParagraphs()
    },
    fetchSectionsAndParagraphs() {
      // 此处模拟数据，实际应从后端接口获取
      return [
        {
          key: 'section-1',
          title: '章节1',
          children: [
            {
              key: 'section-1-1',
              title: '子章节1-1',
              content: '这是子章节1-1的内容。'
            }
          ]
        },
        {
          key: 'section-2',
          title: '章节2',
          content: '这是章节2的内容。'
        }
      ]
    }
  }
}
</script>

<style scoped>
.project-select {
  margin-bottom: 20px;
}
.nested-sections {
  margin-left: 16px;
}
</style>

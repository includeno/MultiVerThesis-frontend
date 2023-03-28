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
        <!-- 工具栏：选择添加 paragraph 或添加 section -->
        <div class="toolbar">
          <a-button @click="addParagraph(section.key)">添加段落</a-button>
          <a-button @click="addSection(section.key)">添加子章节</a-button>
        </div>

        <!-- 渲染 section 内容 -->
        <div v-for="item in section.children" :key="item.key">
          <a-card>
            <!-- 编辑按钮 -->
            <template #extra>
              <a-button @click="editItem(item.key)">编辑</a-button>
            </template>

            <!-- 内容展示 -->
            <template v-if="item.type === 'text'">
              <p>{{ item.content }}</p>
            </template>
            <template v-else-if="item.type === 'formula'">
              <p>公式：{{ item.content }}</p>
            </template>
            <template v-else-if="item.type === 'image'">
              <img :src="item.content" alt="图片" />
            </template>
            <template v-else-if="item.type === 'table'">
              <p>表格：{{ item.content }}</p>
            </template>
          </a-card>
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
            { key: 'text-1', type: 'text', content: '纯文本内容' },
            { key: 'formula-1', type: 'formula', content: 'x^2 + y^2 = 1' },
            { key: 'image-1', type: 'image', content: 'https://example.com/image.jpg' },
            { key: 'table-1', type: 'table', content: '示例表格' }
          ]
        },
        {
          key: 'section-2',
          title: '章节2',
          children: []
        }
      ]
    },
    addParagraph(sectionKey) {
      // 添加段落的逻辑
      console.log('添加段落到章节', sectionKey)
    },
    addSection(sectionKey) {
      // 添加子章节的逻辑
      console.log('添加子章节到章节', sectionKey)
    }
  }
}
</script>

<style scoped>
.project-select {
  margin-bottom: 20px;
}
.toolbar {
  margin-bottom: 10px;
}
</style>
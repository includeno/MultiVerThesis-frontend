<template>
  <div>
    <!-- 折叠面板展示 section 和 paragraph 列表 -->
    <a-collapse>
      <a-collapse-panel
          v-for="section in sections"
          :key="section.id"
          :header="section.title"
      >
        <!-- 工具栏：选择添加 paragraph 或添加 section -->
        <div class="toolbar">
          <a-button @click="addParagraph(section.id)">添加段落</a-button>
          <a-button @click="addSection(section.id)">添加子章节</a-button>
        </div>

        <!-- 使用 Vue Draggable 实现拖拽排序 -->
        <draggable v-model="section.contents" handle=".handle">
          <template #item="{element}">
            {{ element.title }}
            <div class="bordered-card">
              <!-- 添加拖拽把手 -->
              <div class="handle">☰</div>

              <!-- 编辑按钮 -->
              <div class="card-extra">
                <a-button @click="editItem(element.id)">编辑</a-button>
              </div>

              <!-- 内容展示 -->
              <template v-if="element.content_type === 'text' && element.type==='section'">
                <ContentDisplay :sections="element.contents">
                </ContentDisplay>
              </template>
              <template v-if="element.content_type === 'text' && element.type==='paragraph'">
                <p>{{ element.content }}</p>
              </template>
              <template v-else-if="element.content_type === 'formula'">
                <p>公式：{{ element.content }}</p>
              </template>
              <template v-else-if="element.content_type === 'image'">
                <img :src="element.content" alt="图片" />
              </template>
              <template v-else-if="element.content_type === 'table'">
                <p>表格：{{ element.content }}</p>
              </template>
            </div>
          </template>
        </draggable>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'ContentDisplay',
  components: {
    draggable,
    'ContentDisplay': () => import('./ContentCollapse6.vue') // Recursive component
  },
  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log("sections:")
    console.log(this.sections)
  },
  methods: {
    addParagraph(item) {
      // 添加段落的逻辑
      console.log('添加段落到章节', item)
    },
    addSection(item) {
      // 添加子章节的逻辑
      console.log('添加子章节到章节', item)
    },
    editItem(item) {
      // 编辑内容项的逻辑
      console.log('编辑内容项', item)
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

.bordered-card {
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
}
</style>
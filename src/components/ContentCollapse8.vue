<template>
  <div>
    <a-collapse v-model:activeKey="currentActiveKeys">
      <a-collapse-panel
          v-for="section in sections"
          :key="section.id"
          :header="section.title"
          :id="section.id"
      >

        <div>
          <a-button @click="addParagraph(section)">添加段落Paragraph</a-button>
          <InputParagraphDialog
              :show-dialog="showParagraphInputDialog"
              @submit-paragraph-input="handleParagraphInputSubmit"
              @close-paragraph-dialog="closeParagraphInputDialog"
          >
          </InputParagraphDialog>

          <a-button @click="addSection(section)">添加子章节Section</a-button>
          <InputSectionDialog
              :show-dialog="showSectionInputDialog"
              @submit-section-input="handleSectionInputSubmit"
              @close-section-dialog="closeSectionInputDialog"
          ></InputSectionDialog>
          <a-button @click="editItem(section)">编辑</a-button>
        </div>
        <draggable v-model="section.contents" :group="{ name: 'nested' }" itemKey="id">
          <template #item="{element}">
            <div class="bordered-card">
              <!-- 添加拖拽把手 -->
              <div class="handle">☰</div>

              <!-- 编辑按钮 -->
              <div class="card-extra">
                <a-button @click="editItem(element.id)">编辑</a-button>
              </div>

              <template v-if="element.type === 'section'">
                <!-- 递归渲染子章节 -->
                <ContentDisplay :sections="[element]" :activeKeys="syncedActiveKeys"/>
              </template>
              <template v-else>
                <!-- 根据内容类型展示不同内容，这里以文本、公式和表格为例 -->
                <p :id="element.id" v-if="element.content_type === 'text'">{{ element.content }}</p>
                <p :id="element.id" v-else-if="element.content_type === 'formula'">公式：{{ element.content }}</p>
                <p :id="element.id" v-else-if="element.content_type === 'table'">表格：{{ element.content }}</p>
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
import {defineAsyncComponent} from 'vue'
import InputSectionDialog from '@/components/InputSectionDialog'
import InputParagraphDialog from "@/components/InputParagraphDialog";

export default {
  name: 'ContentCollapse',
  components: {
    InputParagraphDialog,
    draggable,
    InputSectionDialog,
    'ContentDisplay': defineAsyncComponent(() => import('./ContentCollapse8.vue')) // Recursive component
  },
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    activeKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentActiveKeys: this.activeKeys,
      showSectionInputDialog: false,
      showParagraphInputDialog: false,
    };
  },

  mounted() {

  },
  methods: {
    addParagraph(item) {
      // 添加段落的逻辑
      console.log('添加段落到章节', item);
      this.showParagraphInputDialog = true;
    },
    addSection(item) {
      // 添加子章节的逻辑
      console.log('添加子章节到章节', item)
      this.showSectionInputDialog = true;
    },
    editItem(item) {
      // 编辑内容项的逻辑
      console.log('编辑内容项', item)
    },
    handleSectionInputSubmit(data) {
      // 处理提交的数据
      console.log("receive data:")
      console.log(data);
      // 关闭模态对话框
      this.showSectionInputDialog = false;
    },
    closeSectionInputDialog() {
      this.showSectionInputDialog = false;
    },
    handleParagraphInputSubmit(data) {
      // 处理提交的数据
      console.log("receive data:")
      console.log(data);
      // 关闭模态对话框
      this.showParagraphInputDialog = false;
    },
    closeParagraphInputDialog(){
      this.showParagraphInputDialog = false;
    }
  },
  computed: {
    syncedActiveKeys: {
      get() {
        // 获取父组件传入的activeKeys
        return this.activeKeys;
      },
      set(value) {
        // 当子组件的activeKeys发生变化时，通过$emit事件通知父组件
        // 使用Set去重，合并父组件的activeKeys和子组件的新值
        const updatedActiveKeys = [...new Set([...this.activeKeys, ...value])];
        this.$emit('update:activeKeys', updatedActiveKeys);
      }
    },

  },
  watch: {
    activeKeys(newActiveKeys) {
      console.log(newActiveKeys);
      this.currentActiveKeys = this.activeKeys;
      console.log("activeKeys updatedActiveKeys: " + newActiveKeys)
      this.$emit('update:activeKeys', newActiveKeys);
    },
    currentActiveKeys: {
      get() {
        // 获取父组件传入的activeKeys
        return this.activeKeys;
      },
      set(newActiveKeys) {
        // 当子组件的activeKeys发生变化时，通过$emit事件通知父组件
        // 使用Set去重，合并父组件的activeKeys和子组件的新值
        const updatedActiveKeys = [...new Set([...newActiveKeys])];
        console.log("currentActiveKeys  updatedActiveKeys :" + updatedActiveKeys);
        this.$emit('update:activeKeys', updatedActiveKeys);
      }
    },
  },

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
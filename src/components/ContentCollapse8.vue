<template>
  <div>
    <a-collapse v-model:activeKey="currentActiveKeys_1">
      <a-collapse-panel
          v-for="section in sections"
          :key="section.id"
          :header="section.title"
          :id="section.id"
      >
        <div>
          <a-button @click="addParagraph(section)">添加段落</a-button>
          <a-button @click="addSection(section)">添加子章节</a-button>
          <a-button @click="editItem(section)">编辑</a-button>
        </div>
        <draggable v-model="section.contents" :group="{ name: 'nested' }">
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

export default {
  name: 'ContentCollapse',
  components: {
    draggable,
    'ContentDisplay': () => import('./ContentCollapse8.vue') // Recursive component
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
      currentActiveKeys_1: this.activeKeys,
    };
  },

  mounted() {
    console.log("sections:")
    // console.log(this.sections)
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
  },
  computed: {
    syncedActiveKeys: {
      get() {
        // 获取父组件传入的activeKeys
        return this.activeKeys;
      },
      set(value) {
        //console.log("syncedActiveKeys set"+value);
        // 当子组件的activeKeys发生变化时，通过$emit事件通知父组件
        // 使用Set去重，合并父组件的activeKeys和子组件的新值
        const updatedActiveKeys = [...new Set([...this.activeKeys, ...value])];
        this.$emit('update:activeKeys', updatedActiveKeys);
      }
    },
    currentActiveKeys:{
      get() {
        // 获取父组件传入的activeKeys
        return this.activeKeys;
      },
      set(newActiveKeys) {
        //console.log("syncedActiveKeys set"+value);
        // 当子组件的activeKeys发生变化时，通过$emit事件通知父组件
        // 使用Set去重，合并父组件的activeKeys和子组件的新值
        const updatedActiveKeys = [...new Set([ ...newActiveKeys])];
        console.log("currentActiveKeys  updatedActiveKeys :" + updatedActiveKeys);
        this.$emit('update:activeKeys', updatedActiveKeys);
      }
    },
  },
  watch: {
    activeKeys(newActiveKeys) {
      console.log(newActiveKeys);
      this.currentActiveKeys = newActiveKeys;
      console.log("activeKeys updatedActiveKeys: "+newActiveKeys)
      this.$emit('update:activeKeys', newActiveKeys);
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
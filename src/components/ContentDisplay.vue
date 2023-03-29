<template>
  <div>
    <a-collapse v-model:active-key="currentActiveKeys" @change="handleCollapseChange">
      <a-collapse-panel
          v-for="item in contents"
          :key="item.id"
          :header="item.title"
          :force-render="true"
      >
        <div v-if="item.type === 'section'">
          <!-- 递归渲染子内容 -->
          <ContentDisplay :contents="item.contents" :data="data" :activePanelKeys="currentActiveKeys"
                          @update-collapse="$emit('update-collapse', $event)"/>
        </div>
        <!-- 展示内容 -->
        <div v-else-if="item.content_type === 'text'">{{ item.content }}</div>
        <div v-else-if="item.content_type === 'formula'">公式：{{ item.content }}</div>
        <div v-else-if="item.content_type === 'table'">表格：{{ item.content }}</div>

      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>

export default {
  name: 'ContentDisplay',
  components: {
    'ContentDisplay': () => import('./ContentDisplay.vue') // 引用自身组件
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    contents: {
      type: Array,
      default: () => []
    },
    activePanelKeys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentActiveKeys: this.activePanelKeys,
    };
  },
  watch: {
    // 监听父组件传入的contents数据变化，并更新activePanelKeys
    contents: {
      deep: true,
      immediate: true
    },
    activePanelKeys(newActiveKeys) {
      // 同步父组件传递的 activePanelKeys
      this.currentActiveKeys = newActiveKeys;
    },
  },
  methods: {
    // 获取默认展开的面板项的key值
    getOpenKeys(data) {
      const openKeys = [];
      data.forEach(item => {
        if (item.type === 'section' && !item.isCollapsed) {
          openKeys.push(item.id);
        }
        if (item.contents) {
          openKeys.push(...this.getOpenKeys(item.contents));
        }
      });
      return openKeys;
    },
    async handleCollapseChange(activeKeys) {
      this.currentActiveKeys = activeKeys;
      // 遍历contents中的每一项，并设置isCollapsed字段
      await this.contents.forEach(item => {
        let isCollapsed = !activeKeys.includes(String(item.id));
        if (isCollapsed == null) {
          isCollapsed = false;
        }
        console.log("activeKeys:" + activeKeys + " item.id:" + item.id);
        item.isCollapsed = isCollapsed;
        console.log("forEach id:" + item.id + " " + isCollapsed);
        // 发送自定义事件，通知父组件更新contents数据的isCollapsed字段
        this.$emit('update-collapse', item.id,isCollapsed);
        //this.$emit('update-collapse', {id:item.id, isCollapsed:isCollapsed});
      });
      this.$emit('update-collapse-keys', {});
    },

  },
}
</script>

<style scoped>
/* 此处可以根据需要添加样式 */
</style>

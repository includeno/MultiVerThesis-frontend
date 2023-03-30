<template>
  <div>
    <a-collapse v-model:activeKey="dcurrentActivePanelKeys" @change="handleCollapseChange">
      <a-collapse-panel
          v-for="item in contents"
          :key="item.id"
          :header="item.title"
          :force-render="true"
      >
        <div v-if="item.type === 'section'">
          <!-- 递归渲染子内容 -->
          <ContentDisplay :contents="item.contents" :data="data" :activePanelKeys="dcurrentActivePanelKeys"
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
    // 监听activePanelKeys属性的变化
    activePanelKeys: {
      get() {
        return this.activePanelKeys;
      },
      set(newActivePanelKeys) {
        // 更新组件内部的折叠状态
        this.currentActivePanelKeys = newActivePanelKeys;
      },
      immediate: true
    },
  }
  ,
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
    }
    ,
    async handleCollapseChange(activeKeys) {
      this.currentActiveKeys = activeKeys;
      // 遍历contents中的每一项，并设置isCollapsed字段
      await this.contents.forEach(item => {
        let isCollapsed = !activeKeys.includes(String(item.id));
        console.log("activeKeys:" + activeKeys + " item.id:" + item.id);
        item.isCollapsed = isCollapsed;
        console.log("forEach id:" + item.id + " " + isCollapsed);
        // 发送自定义事件，通知父组件更新contents数据的isCollapsed字段
        this.$emit('update-collapse', item.id, isCollapsed);
        //this.$emit('update-collapse', {id:item.id, isCollapsed:isCollapsed});
      });
      this.$emit('update-collapse-keys', {});
    },

  },
  computed:{
    // 监听组件内部的折叠状态变化
    dcurrentActivePanelKeys:{
      get() {
        return this.currentActiveKeys;
      },
      set(newActivePanelKeys) {
        // 通过$emit事件通知父组件折叠状态的变化
        this.$emit('update:activePanelKeys', newActivePanelKeys);
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
/* 此处可以根据需要添加样式 */
</style>

<template>
  <div>
    <a-collapse v-model="activePanelKeys" @change="handleCollapseChange">
      <a-collapse-panel
          v-for="item in contents"
          :key="item.id"
          :header="item.title"
      >
        <div v-if="item.type === 'section'">
          <!-- 递归渲染子内容 -->
          <ContentDisplay :contents="item.contents" :data="data" @update-collapse="$emit('update-collapse', $event)"/>
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
    }
  },
  data() {
    return {
      activePanelKeys: [] // 当前激活的面板项的key值
    };
  },
  watch: {
    // 监听父组件传入的contents数据变化，并更新activePanelKeys
    contents: {
      deep: true,
      immediate: true,
      handler(contents) {
        // 收集所有默认展开的面板项的key值
        this.activePanelKeys = this.getOpenKeys(contents);
      }
    }
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
    handleCollapseChange(activeKeys) {
      // 更新激活的面板key值
      this.activePanelKeys = activeKeys;
      console.log("handleCollapseChange type: "+typeof activeKeys);
      console.log("handleCollapseChange: "+activeKeys);
      // 更新原始数据的isCollapsed字段
      //this.updateIsCollapsed(this.data, activeKeys);

      // 遍历contents中的每一项，并设置isCollapsed字段
      this.contents.forEach(item => {
        const isCollapsed = !activeKeys.includes(String(item.id));
        console.log("activeKeys:"+activeKeys+" item.id:"+item.id);
        item.isCollapsed = isCollapsed;
        console.log("forEach id:"+item.id+" "+isCollapsed);
        // 发送自定义事件，通知父组件更新contents数据的isCollapsed字段
        this.$emit('update-collapse', item.id, isCollapsed);
      });
    },
    // updateIsCollapsed(data, activeKeys) {
    //   data.forEach(item => {
    //     if (item.type === 'section') {
    //       // 如果item的id不在activeKeys中，则设置isCollapsed为true，否则设置为false
    //       item.isCollapsed = !activeKeys.includes(item.id);
    //     }
    //     // 如果存在子内容，则递归处理子内容
    //     if (item.contents) {
    //       this.updateIsCollapsed(item.contents, activeKeys);
    //     }
    //   });
    // },

  }
}
</script>

<style scoped>
/* 此处可以根据需要添加样式 */
</style>

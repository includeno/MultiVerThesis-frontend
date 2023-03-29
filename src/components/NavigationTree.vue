<template>
  <a-tree
      :tree-data="treeData"
      :fieldNames="{ title: 'title', key: 'id', children: 'contents' }"
      @select="onSelect"
  />
</template>

<script>
export default {
  name: 'NavigationTree',
  props: {
    data0: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    treeData() {
      // 过滤并格式化数据为树形结构所需格式
      return this.formatTreeData(this.data0.filter(item => item.type === 'section'));
    }
  },
  methods: {
    formatTreeData(data) {
      return data.map(item => {
        if (item.type === 'section' && item.contents && item.contents.length > 0) {
          return {
            ...item,
            contents: this.formatTreeData(item.contents.filter(child => child.type === 'section'))
          };
        }
        return item;
      });
    },
    onSelect(selectedKeys, { selectedNodes }) {
      console.log('选中节点', selectedKeys, selectedNodes);
      // 处理树节点选中事件，可以实现快速定位功能
    }
  }
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>

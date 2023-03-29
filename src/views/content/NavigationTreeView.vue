<template>
  <div class="container">
    <div class="navigation-tree">
      <!-- 使用 NavigationTree 组件，并传入数据 data0 -->
      <NavigationTree :data0="data0" />
    </div>
    <div class="content-area">
      <!-- 右侧内容区域，可以根据需要展示实际内容 -->
      Content Area
    </div>
  </div>
</template>

<script>
import NavigationTree from '@/components/NavigationTree.vue';

export default {
  name: 'NavigationTreeView',
  components: {
    NavigationTree
  },
  data() {
    return {
      // 示例数据，实际项目中应从后端获取
      data0: [
        {
          title: 'Chapter 1',
          type: 'section',
          id: 1,
          contents: [
            {
              title: 'Section 1.1',
              type: 'section',
              id: 2,
              isLeaf: false,
              contents: [] // Section 1.1的子内容
            }
          ]
        }
      ],
      treeData: [{
        title: 'parent 0',
        key: '0-0',
        children: [{
          title: 'leaf 0-0',
          key: '0-0-0',
          isLeaf: true,
        }, {
          title: 'leaf 0-1',
          key: '0-0-1',
          isLeaf: true,
        }],
      }, {
        title: 'parent 1',
        key: '0-1',
        children: [{
          title: 'leaf 1-0',
          key: '0-1-0',
          isLeaf: true,
        }, {
          title: 'leaf 1-1',
          key: '0-1-1',
          isLeaf: true,
        }],
      }]

    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
}

.navigation-tree {
  width: 250px;
  border-right: 1px solid #d9d9d9;
  padding-right: 10px;
}

.content-area {
  flex: 1;
  padding-left: 10px;
}
</style>

<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <div class="navigation">
      <NavigationTree :data0="data0" @select="onSelect"/>
    </div>
    <!-- 右侧折叠面板内容区 -->
    <div class="content">
      <ContentDisplay :sections="data0"/>
    </div>
  </div>
</template>

<script>
import NavigationTree from '@/components/NavigationTree.vue';
import ContentDisplay from '@/components/ContentCollapse7.vue';

export default {
  name: 'CompletedView',
  components: {
    NavigationTree,
    ContentDisplay
  },
  mounted() {
    this.addIsLeafField(this.data0)
  },
  data() {
    return {
      data0: [
        {
          title: 'Chapter 1',
          type: 'section',
          id: 1,
          isLeaf: false,
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
    };
  },
  methods: {
    onSelect(selectedKeys, {selectedNodes}) {
      // 实现导航栏选中事件的处理逻辑，例如快速定位
      // selectedKeys为选中节点的key，selectedNodes为选中节点信息
      console.log(selectedKeys, selectedNodes);
    },
    addIsLeafField(data) {
      if (Array.isArray(data)) {
        data.forEach(item => this.addIsLeafField(item));
      } else if (typeof data === 'object' && data !== null) {
        // 根据type属性值设置isleaf字段
        data.isleaf = data.type === 'section' ? false : true;
        // 如果存在contents字段，则递归处理contents字段
        if (Array.isArray(data.contents)) {
          this.addIsLeafField(data.contents);
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}

.navigation {
  width: 250px;
}

.content {
  flex: 1;
}
</style>

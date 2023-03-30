<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <div class="navigation">
      <navigation-tree :data0="data" @update-select="expandAndScrollTo"></navigation-tree>
    </div>
    <!-- 右侧折叠面板内容区 -->
    <div class="content">
      <ContentCollapse :active-keys="activeKeys" :sections="data"></ContentCollapse>
    </div>
  </div>
</template>

<script>
import NavigationTree from "@/components/NavigationTree2";
import ContentCollapse from "@/components/ContentCollapse8";
import axios from 'axios';

export default {
  components: {ContentCollapse, NavigationTree},
  data() {
    return {
      activeKeys: [], // 响应式数据，存储展开的 Panel 的 ID
      data: [],
      index: 1,
      message: '',
    }
  },
  mounted() {
    this.fetchData();
    console.log("data:");
    console.log(this.data);
  },
  methods: {
    fetchData() {
      // 假设接口URL是'/api/data'，您需要根据实际情况替换
      axios.get('http://localhost:8085/data')
          .then(response => {
            // 将获取到的数据存储到sections中
            this.data = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    handleChange(key) {
      console.log('change:', key)
    },
    expandAndScrollTo(id) {
      if (typeof id === 'undefined') {
        this.activeKeys = []
        return
      }
      let nextKeys = []
      // 获取所有父级面板的 ID
      const paths = this.traverseTree(this.data);
      for (let path of paths) {
        if (path.key == id) {
          nextKeys = path.path;
          break;
        }
      }
      console.log("CollapseExpendDemoV4.vue nextKeys:" + nextKeys);
      // 更新 activeKey，以展开指定的面板以及所有父级面板
      this.activeKeys = nextKeys;
      console.log("CollapseExpendDemoV4.vue activeKey:" + this.activeKeys);
      for (let key of nextKeys) {
        this.$nextTick( () => {
          const el = document.getElementById(key);
          console.log("$nextTick key" + key);
          console.log("$nextTick el" + el);
          if (el) {
            el.scrollIntoView({behavior: 'auto'});
          }
        })
      }
      // 滚动到指定的面板位置
      this.$nextTick(() => {

      });

    },
    generateSampleData(depth, countPerLevel, currentDepth = 1, currentId = 1) {
      if (depth <= 0 || currentDepth > depth) {
        return [];
      }

      const data = [];
      for (let i = 1; i <= countPerLevel; i++) {
        const id = currentId + i - 1;
        const section = {
          title: `Chapter ${currentDepth}.${i}`,
          type: 'section',
          id: `${currentDepth}.${i}.${id}`,
          isLeaf: currentDepth === depth,
          contents: this.generateSampleData(depth, countPerLevel, currentDepth + 1, id * countPerLevel)
        };
        data.push(section);
      }
      return data;
    },

    traverseTree(data) {
      const path = [];
      const result = [];
      for (let i in data) {
        const root = data[i];
        //console.log("root:" + root.id)
        this.dfs(root, root.contents, path, result);
      }
      return result;
    },

    dfs(node, data, path, result) {
      if (!node) return;

      // 将当前节点的id添加到路径中
      path.push(node.id);

      // 将当前节点的id（key）和路径添加到结果集
      result.push({key: node.id, path: [...path]});
      //console.log("result:" + JSON.stringify(result))

      // 判断当前节点是否有子节点
      if (node.contents && node.contents.length > 0) {
        // 遍历子节点
        for (const child of node.contents) {
          // 找到子节点对应的对象
          const childNode = data.find(item => item.id === child.id);
          // 递归处理子节点
          this.dfs(childNode, childNode.contents, path, result);
        }
      }
      // 回溯：移除最后添加的节点的id，回退到上一个节点
      path.pop();
    }
  }
  ,
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
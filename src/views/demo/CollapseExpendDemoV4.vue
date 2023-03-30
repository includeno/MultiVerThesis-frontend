<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <div class="navigation">
      <navigation-tree :data0="data" @update-select="expandAndScrollTo"></navigation-tree>
    </div>
    <!-- 右侧折叠面板内容区 -->
    <div class="content">
      <ContentCollapse :active-keys="activeKey" :sections="data"></ContentCollapse>
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
      activeKey: [], // 响应式数据，存储展开的 Panel 的 ID
      data: [],
      index:1,
      message:'',
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
      if(typeof id ==='undefined'){
        id=this.message;
      }
      // 获取所有父级面板的 ID
      const parentKeys = this.getAllParentKeys(id, this.data);
      // 更新 activeKey，以展开指定的面板以及所有父级面板
      this.activeKey = parentKeys.concat(id);
      console.log("this.activeKey:"+this.activeKey);
      // 滚动到指定的面板位置
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
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

    // 获取指定 ID 的所有父级面板的 ID
    getAllParentKeys(id, data, parentKeys = []) {
      for (const i in data) {
        let item=data[i];
        if (item.id === id) {
          return parentKeys;
        }
        if (item.contents && item.contents.length > 0) {
          const keys = this.getAllParentKeys(id, item.contents, parentKeys.concat(item.id));
          if (keys) {
            return keys;
          }
        }
      }
      return [];
    },

  },
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
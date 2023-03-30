<template>
  <div>
    <navigation-tree ></navigation-tree>
    <a-collapse v-model:activeKey="activeKey" @change="handleChange">
      <!-- 使用 v-for 循环渲染 20 个 a-collapse-panel 组件 -->
      <a-collapse-panel
          v-for="item in data"
          :key="item.id"
          :header="`Panel ${item.title}`"
          :id="item.id"
      >
        Content {{ item.id }}
      </a-collapse-panel>
    </a-collapse>
    <input type="text" v-model="message">
    <a-button @click="expandAndScrollTo(message)">展开并定位到 Panel {{message}}</a-button>
  </div>
</template>

<script>
import NavigationTree from "@/components/NavigationTree";
export default {
  components: {NavigationTree},
  data() {
    return {
      activeKey: [], // 响应式数据，存储展开的 Panel 的 ID
      data: [],
      index:1,
      message:'',
    }
  },
  mounted() {
    const depth = 1; // 生成的层数
    const countPerLevel = 6; // 每层的节数量
    this.data = this.generateSampleData(depth, countPerLevel);
    console.log("data:");
    console.log(this.data);
  },
  methods: {
    handleChange(key) {
      console.log('change:', key)
    },
    expandAndScrollTo(id) {
      if(typeof id ==='undefined'){
        id=this.message;
      }
      alert(this.message);
      this.activeKey = [id] // 展开指定的 Panel
      // 根据实际情况选择元素，然后滚动到指定位置
      const el = document.getElementById(id)
      el.scrollIntoView({behavior: 'smooth'})
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
          id: id,
          isLeaf: currentDepth === depth,
          contents: this.generateSampleData(depth, countPerLevel, currentDepth + 1, id * countPerLevel)
        };
        data.push(section);
      }
      return data;
    }
  },
  computed:{
    cp_index(){
      return this.index;
    }
  }
}
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
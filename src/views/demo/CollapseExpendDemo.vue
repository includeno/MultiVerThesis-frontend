<template>
  <div>
    <a-collapse v-model:activeKey="activeKey" @change="handleChange">
      <!-- 使用 v-for 循环渲染 20 个 a-collapse-panel 组件 -->
      <a-collapse-panel
          v-for="i in 50"
          :key="i"
          :header="`Panel ${i}`"
          :id="i"
      >
        Content {{i}}
      </a-collapse-panel>
    </a-collapse>
    <a-button @click="expandAndScrollTo('10')">展开并定位到 Panel 10</a-button>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  setup() {
    const activeKey = ref([]) // 响应式数据，存储展开的 Panel 的 ID

    const handleChange = (key) => {
      console.log('change:', key)
    }

    const expandAndScrollTo = (id) => {
      activeKey.value = [id] // 展开指定的 Panel
      // 根据实际情况选择元素，然后滚动到指定位置
      const el = document.getElementById(id)
      el.scrollIntoView({behavior: 'smooth'})
    }

    return {activeKey, handleChange, expandAndScrollTo}
  },
}
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
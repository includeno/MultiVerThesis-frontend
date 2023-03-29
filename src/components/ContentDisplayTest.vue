<template>
  <a-collapse v-model:activeKey="currentActiveKeys">
    currentActiveKeys:{{currentActiveKeys}}
    activeKeys:{{activeKeys}}
    <a-collapse-panel v-for="section in sections" :key="String(section.id)" :header="section.title">
      {{ section.title }}
      <ContentDisplay v-if="section.contents" :sections="section.contents" :activeKeys="syncedActiveKeys" />
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
export default {
  name: 'ContentDisplay',
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    activeKeys: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log("activeKeys:");
    console.log(this.activeKeys);
  },
  computed: {
    syncedActiveKeys: {
      get() {
        // 获取父组件传入的activeKeys
        return this.activeKeys;
      },
      set(value) {
        //console.log("syncedActiveKeys set"+value);
        // 当子组件的activeKeys发生变化时，通过$emit事件通知父组件
        // 使用Set去重，合并父组件的activeKeys和子组件的新值
        const updatedActiveKeys = [...new Set([...this.activeKeys, ...value])];
        this.$emit('update:activeKeys', updatedActiveKeys);
      }
    }
  },
  data() {
    return {
      currentActiveKeys: this.activeKeys
    };
  },
  watch: {
    activeKeys(newActiveKeys) {
      console.log(newActiveKeys);
      this.currentActiveKeys = newActiveKeys;
      console.log("activeKeys updatedActiveKeys: "+newActiveKeys)
    },
    currentActiveKeys(newActiveKeys){
      console.log("===============");
      console.log(newActiveKeys);
      console.log(this.activeKeys);
      console.log(this.currentActiveKeys);
      console.log("===============");
      const updatedActiveKeys = [...new Set([...this.activeKeys, ...this.currentActiveKeys])];
      console.log("currentActiveKeys  updatedActiveKeys :" + updatedActiveKeys);
      this.$emit('update:activeKeys', updatedActiveKeys);
    },
  },
  methods:{

  },
}
</script>

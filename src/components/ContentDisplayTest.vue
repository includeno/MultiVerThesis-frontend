<template>
  <a-collapse v-model:activeKey="syncedActiveKeys">
    currentActiveKeys:{{activeKeys}}
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
        this.$emit('update:activeKeys', value);
        //console.log("syncedActiveKeys set"+value);
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
      this.currentActiveKeys = newActiveKeys;
      console.log("newActiveKeys: "+newActiveKeys)
    }
  }
}
</script>

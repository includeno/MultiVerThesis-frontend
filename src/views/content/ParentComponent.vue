<template>
  <div>
    <button @click="openPath(['1','2'])">Open Chapter 1 > Section 1.1</button>
    <ContentDisplay ref="contentDisplay" :sections="sections" v-model:activeKeys="syncedActiveKeys" />
  </div>
</template>

<script>
import ContentDisplay from '@/components/ContentDisplayTest.vue';

export default {
  components: {
    ContentDisplay
  },
  data() {
    return {
      activeKeys: [],
      sections: [
        {
          id: 1,
          title: 'Chapter 1',
          contents: [
            {
              id: 2,
              title: 'Section 1.1',
              contents: [
                {
                  id: 3,
                  title: 'Subsection 1.1.1'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          title: 'Chapter 2',
          contents:[]
        }
      ]
    };
  },
  methods: {
    openPath(path) {
      this.activeKeys = path;
      console.log("ParentComponent.vue");
      console.log(this.activeKeys);
    }
  },
  computed:{
    syncedActiveKeys: {
      get() {
        // 获取父组件传入的activeKeys
        return this.activeKeys;
      },
      set(value) {
        //console.log("syncedActiveKeys set"+value);
        // 当子组件的activeKeys发生变化时，通过$emit事件通知父组件
        // 使用Set去重，合并父组件的activeKeys和子组件的新值
        console.log("set value"+value)
        this.activeKeys=value;
        console.log("this.activeKeys :"+this.activeKeys )
      }
    }
  },
  watch: {
    activeKeys(newActiveKeys) {
      this.activeKeys = newActiveKeys;
      console.log("ParentComponent.vue update: newActiveKeys"+newActiveKeys);
    }
  }
}
</script>

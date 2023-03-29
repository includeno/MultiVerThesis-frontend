<template>
  <div>
    <button @click="openPath(['1'])">Open Chapter 1 > Section 1.1</button>
    <ContentDisplay ref="contentDisplay" :sections="sections" :activeKeys="activeKeys" />
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
  watch: {
    activeKeys(newActiveKeys) {
      this.activeKeys = newActiveKeys;
      console.log("update: newActiveKeys"+newActiveKeys);
    }
  }
}
</script>

<template>
  <a-collapse-panel v-if="item.type === 'section'" :key="item.id" :header="item.title">
    <div class="section-toolbar">
      <a-button type="primary" @click="addParagraph(item)">添加段落</a-button>
      <a-button type="primary" @click="addSection(item)">添加章节</a-button>
      <a-button type="primary" @click="editItem(item)">编辑</a-button>
    </div>
    <NestedItem v-for="child in item.contents" :key="child.id" :item="child" />
  </a-collapse-panel>
</template>

<script>
export default {
  name: 'NestedItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addParagraph(item) {
      console.log('添加段落', item);
    },
    addSection(item) {
      console.log('添加章节', item);
    },
    editItem(item) {
      console.log('编辑条目', item);
    },
  },
  components: {
    NestedItem: () => import('./NestedItem.vue'), // 递归引入自身
  },
};
</script>

<style scoped>
.section-toolbar {
  display: flex;
  gap: 10px;
}
</style>

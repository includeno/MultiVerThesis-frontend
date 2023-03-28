<template>
  <div>
    <a-collapse v-model="activeKeys" accordion>
      <nested-item v-for="item in data0" :key="item.id" :item="item"/>
    </a-collapse>
  </div>
</template>

<script>
const NestedItem = {
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
  template: `
    <a-collapse-panel v-if="item.type === 'section'" :key="item.id" :header="item.title">
    <div class="section-toolbar">
      <a-button type="primary" @click="addParagraph(item)">添加段落</a-button>
      <a-button type="primary" @click="addSection(item)">添加章节</a-button>
      <a-button type="primary" @click="editItem(item)">编辑</a-button>
    </div>
    <nested-item v-for="child in item.contents" :key="child.id" :item="child"/>
    </a-collapse-panel>
  `,
};

export default {
  data() {
    return {
      activeKeys: [],
      // 测试数据data0
      data0: [
        {
          "title": "Chapter 1",
          "type": "section",
          "id": 1,
          "sort_index": 1.0,
          "contents": [
            {
              "title": "Section 1.1",
              "type": "section",
              "id": 2,
              "sort_index": 1.1,
              "contents": [
                {
                  "title": "Paragraph 1.1.1",
                  "type": "paragraph",
                  "id": 3,
                  "sort_index": 1.11
                },
                {
                  "title": "Paragraph 1.1.2",
                  "type": "paragraph",
                  "id": 4,
                  "sort_index": 1.12
                },
                {
                  "title": "Section 1.1.1",
                  "type": "section",
                  "id": 5,
                  "sort_index": 1.13,
                  "contents": [
                    {
                      "title": "Paragraph 1.1.1.1",
                      "type": "paragraph",
                      "id": 6,
                      "sort_index": 1.131
                    },
                    {
                      "title": "Paragraph 1.1.1.2",
                      "type": "paragraph",
                      "id": 7,
                      "sort_index": 1.132
                    }
                  ]
                }
              ]
            },
            {
              "title": "Paragraph 1.2",
              "type": "paragraph",
              "id": 8,
              "sort_index": 1.2
            }
          ]
        },
        {
          "title": "Chapter 2",
          "type": "section",
          "sort_index": 2.0,
          "id": 9,
          "contents": [
            {
              "title": "Paragraph 2.1",
              "type": "paragraph",
              "id": 10,
              "sort_index": 2.1
            },
            {
              "title": "Section 2.1",
              "type": "section",
              "id": 11,
              "sort_index": 2.2,
              "contents": [
                {
                  "title": "Paragraph 2.1.1",
                  "type": "paragraph",
                  "id": 12,
                  "sort_index": 2.21
                },
                {
                  "title": "Section 2.1.1",
                  "type": "section",
                  "id": 13,
                  "sort_index": 2.22,
                  "contents": [
                    {
                      "title": "Paragraph 2.1.1.1",
                      "type": "paragraph",
                      "id": 14,
                      "sort_index": 2.221
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "title": "Chapter 3",
          "type": "section",
          "id": 15,
          "sort_index": 3.0,
          "contents": [
            {
              "title": "Paragraph 3.1",
              "type": "paragraph",
              "id": 16,
              "sort_index": 3.1
            },
            {
              "title": "Section 3.1",
              "type": "section",
              "id": 17,
              "sort_index": 3.2,
              "contents": [
                {
                  "title": "Paragraph 3.1.1",
                  "type": "paragraph",
                  "id": 18,
                  "sort_index": 3.21
                }
              ]
            },
            {
              "title": "Paragraph 3.2",
              "type": "paragraph",
              "id": 19,
              "sort_index": 3.3
            }
          ]
        }
      ]
      ,
    };
  },
  components: {
    NestedItem,
  },
};
</script>

<style scoped>
.section-toolbar {
  display: flex;
  gap: 10px;
}
</style>

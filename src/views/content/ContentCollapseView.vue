<template>
  <div>
    <h1>内容管理</h1>
    <!-- 使用ContentDisplay组件展示内容 -->
    <ContentDisplay :sections="sections"/>
  </div>
</template>

<script>
import ContentDisplay from '@/components/ContentCollapse7.vue'; // 根据实际路径导入ContentDisplay组件

export default {
  name: 'ContentView',
  components: {
    ContentDisplay
  },
  mounted() {
    //this.sections=this.fetchSectionsAndParagraphs();
  },
  data() {
    return {
      // 模拟章节数据，实际应用中应从后端获取
      sections: [
        {
          "title": "Chapter 1",
          "type": "section",
          "content_type":"text",
          "id": 1,
          "sort_index": 1.0,
          "contents": [
            {
              "title": "Section 1.1",
              "type": "section",
              "content_type":"text",
              "content":"Section 1.1",
              "id": 2,
              "sort_index": 1.1,
              "contents": [
                {
                  "title": "Paragraph 1.1.1",
                  "type": "paragraph",
                  "content_type":"formula",
                  "content":"x^2 + y^2 = 1",
                  "id": 3,
                  "sort_index": 1.11
                },
                {
                  "title": "Paragraph 1.1.2",
                  "type": "paragraph",
                  "content_type":"text",
                  "content":"Paragraph 1.1.2",
                  "id": 4,
                  "sort_index": 1.12
                },
                {
                  "title": "Section 1.1.1",
                  "type": "section",
                  "id": 5,
                  "content_type":"text",
                  "content":"Section 1.1.1",
                  "sort_index": 1.13,
                  "contents": [
                    {
                      "title": "Paragraph 1.1.1.1",
                      "type": "paragraph",
                      "content_type":"text",
                      "content":"Paragraph 1.1.1.1",
                      "id": 6,
                      "sort_index": 1.131
                    },
                    {
                      "title": "Paragraph 1.1.1.2",
                      "type": "paragraph",
                      "content_type":"table",
                      "content":"示例表格",
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
              "content_type":"text",
              "content":"Paragraph 1.1.1.1",
              "id": 8,
              "sort_index": 1.2
            }
          ]
        },
        {
          "title": "Chapter 2",
          "type": "section",
          "content_type":"text",
          "content":"Chapter 2",
          "sort_index": 2.0,
          "id": 9,
          "contents": [
            {
              "title": "Paragraph 2.1",
              "type": "paragraph",
              "content_type":"text",
              "content":"Paragraph 2.1",
              "id": 10,
              "sort_index": 2.1
            },
            {
              "title": "Section 2.1",
              "type": "section",
              "content_type":"text",
              "content":"Section 2.1",
              "id": 11,
              "sort_index": 2.2,
              "contents": [
                {
                  "title": "Paragraph 2.1.1",
                  "type": "paragraph",
                  "content_type":"text",
                  "content":"Paragraph 2.1.1",
                  "id": 12,
                  "sort_index": 2.21
                },
                {
                  "title": "Section 2.1.1",
                  "type": "section",
                  "content_type":"text",
                  "content":"Section 2.1.1",
                  "id": 13,
                  "sort_index": 2.22,
                  "contents": [
                    {
                      "title": "Paragraph 2.1.1.1",
                      "type": "paragraph",
                      "content_type":"text",
                      "content":"Paragraph 2.1.1.1",
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
          "content_type":"text",
          "content":"Chapter 3",
          "id": 15,
          "sort_index": 3.0,
          "contents": [
            {
              "title": "Paragraph 3.1",
              "type": "paragraph",
              "content_type":"text",
              "content":"Paragraph 3.1",
              "id": 16,
              "sort_index": 3.1
            },
            {
              "title": "Section 3.1",
              "type": "section",
              "content_type":"text",
              "content":"Section 3.1",
              "id": 17,
              "sort_index": 3.2,
              "contents": [
                {
                  "title": "Paragraph 3.1.1",
                  "type": "paragraph",
                  "content_type":"text",
                  "content":"Paragraph 3.1.1",
                  "id": 18,
                  "sort_index": 3.21
                }
              ]
            },
            {
              "title": "Paragraph 3.2",
              "type": "paragraph",
              "content_type":"text",
              "content":"Paragraph 3.2",
              "id": 19,
              "sort_index": 3.3
            }
          ]
        }
      ]

    }
  },
  methods:{
    fetchSectionsAndParagraphs() {
      // 此处模拟数据，实际应从后端接口获取
      return []

    },
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
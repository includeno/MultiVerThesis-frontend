<template>
  <div class="main-view">
    <h1>论文内容展示</h1>
    <!-- 使用ContentDisplay组件展示数据 -->
    <ContentDisplay :contents="contents" :data="contents" @update-collapse="setCollapseStatus" />
  </div>
</template>

<script>
import ContentDisplay from '@/components/ContentDisplay.vue';

export default {
  name: 'ContentDisplayView',
  components: {
    ContentDisplay
  },
  data() {
    return {
      // 数据部分使用contents字段代替
      contents:[
        {
          "title": "Chapter 1",
          "type": "section",
          "content_type": "text",
          "id": 1,
          "sort_index": 1,
          "contents": [
            {
              "title": "Section 1.1",
              "type": "section",
              "content_type": "text",
              "content": "Section 1.1",
              "id": 2,
              "sort_index": 1.1,
              "contents": [
                {
                  "title": "Paragraph 1.1.1",
                  "type": "paragraph",
                  "content_type": "formula",
                  "content": "x^2 + y^2 = 1",
                  "id": 3,
                  "sort_index": 1.11
                },
                {
                  "title": "Paragraph 1.1.2",
                  "type": "paragraph",
                  "content_type": "text",
                  "content": "Paragraph 1.1.2",
                  "id": 4,
                  "sort_index": 1.12
                },
                {
                  "title": "Section 1.1.1",
                  "type": "section",
                  "id": 5,
                  "content_type": "text",
                  "content": "Section 1.1.1",
                  "sort_index": 1.13,
                  "contents": [
                    {
                      "title": "Paragraph 1.1.1.1",
                      "type": "paragraph",
                      "content_type": "text",
                      "content": "Paragraph 1.1.1.1",
                      "id": 6,
                      "sort_index": 1.131
                    },
                    {
                      "title": "Paragraph 1.1.1.2",
                      "type": "paragraph",
                      "content_type": "table",
                      "content": "示例表格",
                      "id": 7,
                      "sort_index": 1.132
                    }
                  ],
                  "isCollapsed": true
                }
              ],
              "isCollapsed": true
            },
            {
              "title": "Paragraph 1.2",
              "type": "paragraph",
              "content_type": "text",
              "content": "Paragraph 1.1.1.1",
              "id": 8,
              "sort_index": 1.2
            }
          ],
          "isCollapsed": true
        },
        {
          "title": "Chapter 2",
          "type": "section",
          "content_type": "text",
          "content": "Chapter 2",
          "sort_index": 2,
          "id": 9,
          "contents": [
            {
              "title": "Paragraph 2.1",
              "type": "paragraph",
              "content_type": "text",
              "content": "Paragraph 2.1",
              "id": 10,
              "sort_index": 2.1
            },
            {
              "title": "Section 2.1",
              "type": "section",
              "content_type": "text",
              "content": "Section 2.1",
              "id": 11,
              "sort_index": 2.2,
              "contents": [
                {
                  "title": "Paragraph 2.1.1",
                  "type": "paragraph",
                  "content_type": "text",
                  "content": "Paragraph 2.1.1",
                  "id": 12,
                  "sort_index": 2.21
                },
                {
                  "title": "Section 2.1.1",
                  "type": "section",
                  "content_type": "text",
                  "content": "Section 2.1.1",
                  "id": 13,
                  "sort_index": 2.22,
                  "contents": [
                    {
                      "title": "Paragraph 2.1.1.1",
                      "type": "paragraph",
                      "content_type": "text",
                      "content": "Paragraph 2.1.1.1",
                      "id": 14,
                      "sort_index": 2.221
                    }
                  ],
                  "isCollapsed": true
                }
              ],
              "isCollapsed": true
            }
          ],
          "isCollapsed": true
        },
        {
          "title": "Chapter 3",
          "type": "section",
          "content_type": "text",
          "content": "Chapter 3",
          "id": 15,
          "sort_index": 3,
          "contents": [
            {
              "title": "Paragraph 3.1",
              "type": "paragraph",
              "content_type": "text",
              "content": "Paragraph 3.1",
              "id": 16,
              "sort_index": 3.1
            },
            {
              "title": "Section 3.1",
              "type": "section",
              "content_type": "text",
              "content": "Section 3.1",
              "id": 17,
              "sort_index": 3.2,
              "contents": [
                {
                  "title": "Paragraph 3.1.1",
                  "type": "paragraph",
                  "content_type": "text",
                  "content": "Paragraph 3.1.1",
                  "id": 18,
                  "sort_index": 3.21
                }
              ],
              "isCollapsed": true
            },
            {
              "title": "Paragraph 3.2",
              "type": "paragraph",
              "content_type": "text",
              "content": "Paragraph 3.2",
              "id": 19,
              "sort_index": 3.3
            }
          ],
          "isCollapsed": true
        }
      ]
    };
  },
  mounted() {
    this.addIsCollapsedProperty(this.contents,true);
  },
  methods:{
    // 监听update-collapse事件的处理函数
    handleUpdateCollapse(updatedContents) {
      // 使用更新后的数据替换原contents数据
      this.contents = updatedContents;
      console.log("handleUpdateCollapse contents new : "+updatedContents);
    },
    addIsCollapsedProperty(data, isCollapsed) {
      // 遍历数据中的每个元素
      data.forEach(item => {
        // 如果当前元素的类型是'section'，则添加isCollapsed属性
        if (item.type === 'section') {
          item.isCollapsed = isCollapsed;
        }
        // 如果当前元素包含子内容（'contents'属性），则递归处理子内容
        if (Array.isArray(item.contents)) {
          this.addIsCollapsedProperty(item.contents, isCollapsed);
        }
      });
    },
    // 设置折叠状态的函数
    setCollapseStatus(id, isCollapsed) {
      const updateStatus = (data, id, isCollapsed) => {
        for (let i in data) {
          let item=data[i];
          console.log(item);
          if (item.id === id) {
            item.isCollapsed = isCollapsed;
            console.log("setCollapseStatus update id"+id+"=>"+isCollapsed);
            return true;
          }
          if (item.contents && updateStatus(item.contents, id, isCollapsed)) {
            return true;
          }
        }
        return false;
      };
      updateStatus(this.contents, id, isCollapsed);
    }
  },
  watch:{
    contents(newActiveKeys) {
      console.log(newActiveKeys);
      console.log("contents new : "+this.contents);
    },
  }
}
</script>

<style scoped>
.main-view {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>

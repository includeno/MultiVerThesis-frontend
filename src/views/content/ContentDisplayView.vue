<template>
  <div class="main-view">
    <div class="navigation">
      <!-- 树形导航组件 -->
      <navigation-tree
          :data0="contents"
          @update-select="onSelect"
      />
    </div>
    <!-- 使用ContentDisplay组件展示数据 -->
    <ContentDisplay :contents="contents" :data="contents" :activePanelKeys="activePanelKeys" @update-collapse="setCollapseStatus" @update-collapse-keys="updateActivePanelKeys" />
  </div>
</template>

<script>
import NavigationTree from '@/components/NavigationTree2.vue';
import ContentDisplay from '@/components/ContentDisplay.vue';

export default {
  name: 'ContentDisplayView',
  components: {
    NavigationTree,ContentDisplay
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
      ],
      activePanelKeys: [], // 用于存放展开状态的面板项的key值
    };
  },
  mounted() {
    this.addIsCollapsedProperty(this.contents,true);
    // 获取展开状态的面板项的key值
    this.activePanelKeys = this.getActivePanelKeysFromData(this.contents);
  },
  methods:{
    onSelect(selectedNodes) {
      // 实现导航栏选中事件的处理逻辑，例如快速定位
      // selectedKeys为选中节点的key，selectedNodes为选中节点信息
      if (selectedNodes.length > 0) {
        const targetId = selectedNodes[0].id; // 获取选中节点的ID
        const targetItem = this.findItemById(this.contents, targetId); // 查找与选中节点对应的数据项
        if (targetItem && targetItem.type === 'section') {
          targetItem.isCollapsed = !targetItem.isCollapsed; // 切换折叠状态
          // 重新计算展开状态的面板项的key值
          this.activePanelKeys = this.getActivePanelKeysFromData(this.contents);
        }
      }
    },
    findItemById(data, targetId) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.id === targetId) {
          return item;
        }
        if (item.contents && item.contents.length > 0) {
          const foundItem = this.findItemById(item.contents, targetId);
          if (foundItem) {
            return foundItem;
          }
        }
      }
      return null; // 如果未找到目标项，返回null
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
      console.log("setCollapseStatus:");
      console.log(id);
      console.log(isCollapsed);
      const updateStatus = (data, id, isCollapsed) => {
        for (let i in data) {
          let item=data[i];
          if(item.type=='paragraph'){
            continue;
          }
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
      if (typeof isCollapsed === 'undefined') {
        // 变量是undefined
        isCollapsed=true;
      }
      updateStatus(this.contents, id, isCollapsed);
    },
    getActivePanelKeysFromData(data) {
      const result = [];
      for (const item of data) {
        if (item.type === 'section' && !item.isCollapsed) {
          // 如果节点是展开状态的section，将id添加到结果数组中
          result.push(item.id);
        }
        if (item.contents) {
          // 如果有子节点，递归处理子节点
          result.push(...this.getActivePanelKeysFromData(item.contents));
        }
      }
      return result;
    },
    updateActivePanelKeys(){
      let before=this.activePanelKeys;
      this.activePanelKeys = this.getActivePanelKeysFromData(this.contents);
      console.log("before:"+before);
      console.log("this.activePanelKeys:"+this.activePanelKeys);
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
.container {
  display: flex;
}

.navigation {
  width: 250px;
}

.content {
  flex: 1;
}
</style>

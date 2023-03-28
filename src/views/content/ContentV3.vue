<template>
  <div>
    <!-- Header with project selection -->
    <a-page-header>
      <template #extra>
        <a-select v-model="selectedProject" placeholder="选择项目" style="width: 200px;">
          <a-select-option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.title }}
          </a-select-option>
        </a-select>
      </template>
    </a-page-header>

    <!-- Right content with collapsible section and paragraph list -->
    <a-collapse v-model="activeKeys" accordion>
      <template v-for="item in data">
        <a-collapse-panel v-if="item.type === 'section'" :key="item.id" :header="item.title">
          <div class="section-toolbar">
            <a-button type="primary" @click="addParagraph(item)">添加段落</a-button>
            <a-button type="primary" @click="addSection(item)">添加章节</a-button>
            <a-button type="primary" @click="editItem(item)">编辑</a-button>
          </div>
          <div v-if="item.contents">
            <!-- Render nested sections and paragraphs -->
            <template v-for="nestedItem in item.contents">
              <a-collapse-panel v-if="nestedItem.type === 'section'" :key="nestedItem.id" :header="nestedItem.title">
                <!-- Nested section content -->
              </a-collapse-panel>
              <a-card v-else-if="nestedItem.type === 'paragraph'" :key="nestedItem.id">
                <!-- Paragraph content based on paragraph_type -->
                <div v-if="nestedItem.paragraph_type === 'text'">{{ nestedItem.title }}</div>
                <!-- Other paragraph types: formula, image, table -->
              </a-card>
            </template>
          </div>
        </a-collapse-panel>
      </template>
    </a-collapse>
  </div>
</template>

<script>
let data0 = [
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
];
export default {
  data() {
    return {
      activeKeys: [],
      projects: [], // 项目列表数据，需要从后端获取
      selectedProject: null,
      data:data0,
    };
  },
  created() {
    // 获取项目列表数据，并设置到 projects 中
  },
  methods: {
    addParagraph(item) {
      // 添加段落逻辑
      console.log(item);
    },
    addSection(item) {
      // 添加章节逻辑
      console.log(item);
    },
    editItem(item) {
      // 编辑条目（章节或段落）逻辑
      console.log(item);
    },
  },
  // props: {
  //   data0: {
  //     type: Array,
  //     required: true,
  //   },
  // },
};
</script>

<style scoped>
.section-toolbar {
  display: flex;
  gap: 10px;
}
</style>

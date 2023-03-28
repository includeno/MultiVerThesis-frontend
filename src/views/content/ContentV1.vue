<template>
  <div>
    <a-collapse v-model="activeKeys" accordion>
      <template v-for="(section) in sections" :key="section.id">
        <a-collapse-panel :header="section.section_title">
          <div class="section-toolbar">
            <a-button type="primary" @click="addParagraph(section)">添加段落</a-button>
            <a-button type="primary" @click="addSection(section)">添加章节</a-button>
            <a-button type="primary" @click="editSection(section)">编辑</a-button>
          </div>
          <div v-if="section.children.length > 0">
            <section-list :sections="section.children" />
          </div>
          <div v-for="paragraph in section.paragraphs" :key="paragraph.id">
            <a-card>
              <!-- Paragraph content based on paragraph_type -->
              <div v-if="paragraph.paragraph_type === 'text'">{{ paragraph.content }}</div>
              <!-- Other paragraph types: formula, image, table -->
            </a-card>
          </div>
        </a-collapse-panel>
      </template>
    </a-collapse>
  </div>
</template>

<script>

// Mock data based on SQL structure
const mockData = [
  {
    id: 1,
    section_title: 'Section 1',
    children: [
      {
        id: 2,
        section_title: 'Section 1.1',
        children: [],
        paragraphs: [
          {
            id: 1,
            content: 'This is a paragraph.',
            paragraph_type: 'text'
          }
        ]
      }
    ],
    paragraphs: []
  },
  {
    id: 3,
    section_title: 'Section 2',
    children: [],
    paragraphs: []
  }
];

export default {
  components: {
    'section-list': () => import('./ContentV1.vue') // Recursive component
  },
  data() {
    return {
      activeKeys: [],
      sections: mockData
    };
  },
  methods: {
    addParagraph(section) {
      // Add paragraph logic
      console.log(section);
    },
    addSection(section) {
      // Add section logic
      console.log(section);
    },
    editSection(section) {
      // Edit section logic
      console.log(section);
    }
  }
};
</script>

<style scoped>
.section-toolbar {
  display: flex;
  justify-content: flex-end;
}
</style>

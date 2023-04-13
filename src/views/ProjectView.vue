<template>
  <div>
    <div class="project">
      <label>标题：{{ project.projectName }}</label>
      <div>
        <!-- 下拉菜单展示项目列表 -->
        <a-select
            v-model="selectedShowProjectWay"
            placeholder="项目展示方式"
            @change="handleShowProjectWayChange"
            :defaultValue="selectedShowProjectWay"
        >
          <a-select-option
              v-for="way in projectWay"
              :key="way.key"
              :value="way.value"
          >
            {{ way.key }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="toolbar">
      <a-button-group>
        <a-button type="primary">添加章节</a-button>
        <a-button>保存草稿</a-button>
        <a-button type="primary" @click="downloadFile">下载文件</a-button>
      </a-button-group>

    </div>
    <a-divider></a-divider>

    <div v-show="data.length>0" class="container">
      <!-- 左侧导航栏 -->
      <div class="navigation">
        <navigation-tree :data0="data" @update-select="expandAndScrollTo"></navigation-tree>
      </div>
      <!-- 右侧折叠面板内容区 -->
      <div class="content">
        <ContentCollapse
            :active-keys="activeKeys" :sections="data"
            @paragraph-input-submitted="handleParagraphInputSubmitted"
            @section-input-submitted="handleSectionInputSubmitted"
        ></ContentCollapse>
      </div>
    </div>
  </div>

</template>

<script>
import NavigationTree from "@/components/NavigationTree2";
import ContentCollapse from "@/components/ContentCollapse8";
import {download, getProjectDetail} from "@/api/ProjectService";
import {addSection} from "@/api/SectionService";

export default {
  components: {ContentCollapse, NavigationTree},
  data() {
    return {
      projectUuid: this.$route.params.uuid,
      project: {},
      selectedShowProjectWay: 1,
      projectWay: [{key: '全文', value: 1}, {key: '章节', value: 2}],
      activeKeys: [], // 响应式数据，存储展开的 Panel 的 ID
      data: [],
      index: 1,
      message: '',
    }
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    // 监听路由参数ID的变化，当路由参数ID发生变化时，重新获取数据
    '$route.params.uuid': {
      immediate: true, // 立即执行一次
      handler(newId, oldId) {
        if (newId !== oldId) {
          this.projectUuid = this.$route.params.uuid;
          console.log("route.params.uuid projectUuid:" + this.projectUuid);
          this.fetchData();
        }
      }
    },
  },
  computed: {
    // 生成一个唯一的 ID
    global_data: {
      get() {
        if (this.selectedShowProjectWay === 1) {
          return this.data;
        }
        return this.data.filter(item => item.type == 'section');
      },
      set(value) {
        this.data = value;
      }
    }
  },
  methods: {
    fetchData() {
      // 假设接口URL是'/api/data'，您需要根据实际情况替换
      getProjectDetail(this.projectUuid).then(response => {
        console.log("response.data.data:");
        console.log(response.data.data);
        // 解析响应数据并更新数据 文章章节和段落
        this.data = response.data.data.elements;
        // 更新project 属性
        this.project = response.data.data;
      });
    },
    handleChange(key) {
      console.log('change:', key)
    },
    expandAndScrollTo(id) {
      if (typeof id === 'undefined') {
        this.activeKeys = []
        return
      }
      let nextKeys = []
      // 获取所有父级面板的 ID
      const paths = this.traverseTree(this.data);
      for (let path of paths) {
        if (path.key == id) {
          nextKeys = path.path;
          break;
        }
      }
      console.log("CollapseExpendDemoV4.vue nextKeys:" + nextKeys);
      // 更新 activeKey，以展开指定的面板以及所有父级面板
      this.activeKeys = nextKeys;
      console.log("CollapseExpendDemoV4.vue activeKey:" + this.activeKeys);
      for (let key of nextKeys) {
        this.$nextTick(() => {
          const el = document.getElementById(key);
          console.log("$nextTick key" + key);
          console.log("$nextTick el" + el);
          if (el) {
            el.scrollIntoView({behavior: 'auto'});
          }
        })
      }
      // 滚动到指定的面板位置
      this.$nextTick(() => {

      });

    },
    generateSampleData(depth, countPerLevel, currentDepth = 1, currentId = 1) {
      if (depth <= 0 || currentDepth > depth) {
        return [];
      }

      const data = [];
      for (let i = 1; i <= countPerLevel; i++) {
        const id = currentId + i - 1;
        const section = {
          title: `Chapter ${currentDepth}.${i}`,
          type: 'section',
          id: `${currentDepth}.${i}.${id}`,
          isLeaf: currentDepth === depth,
          contents: this.generateSampleData(depth, countPerLevel, currentDepth + 1, id * countPerLevel)
        };
        data.push(section);
      }
      return data;
    },

    //https://juejin.cn/post/7098698020685873189
    traverseTree(data) {
      const path = [];
      const result = [];
      for (let i in data) {
        const root = data[i];
        //console.log("root:" + root.id)
        this.dfs(root, root.contents, path, result);
      }
      return result;
    },

    dfs(node, data, path, result) {
      if (!node) return;

      // 将当前节点的id添加到路径中
      path.push(node.id);

      // 将当前节点的id（key）和路径添加到结果集
      result.push({key: node.id, path: [...path]});
      //console.log("result:" + JSON.stringify(result))

      // 判断当前节点是否有子节点
      if (node.contents && node.contents.length > 0) {
        // 遍历子节点
        for (const child of node.contents) {
          // 找到子节点对应的对象
          const childNode = data.find(item => item.id === child.id);
          // 递归处理子节点
          this.dfs(childNode, childNode.contents, path, result);
        }
      }
      // 回溯：移除最后添加的节点的id，回退到上一个节点
      path.pop();
    },

    async handleParagraphInputSubmitted(data) {
      // 处理传递过来的数据
      console.log("receive data from ContentCollapse8:");
      console.log(data);
      // 在这里根据具体的业务逻辑对数据进行处理，例如更新 data 数组
      // 由于代码仓库中不存在相应的更新数据的接口，这里仅演示如何传递数据
      //const parentId = String(data.id)
      const parent = this.data.find(item => item.id == data.id);
      console.log("parent:" + JSON.stringify(parent));
      let paragraphData = {
        title: data.title,
        type: "paragraph",
        content_type: "formula",
        content: data.content,
        id: 11111,
        sort_index: 1.999
      }

      this.addElementToSection(this.data, parent.id, paragraphData);
    },
    addElementToSection(data, sectionId, paragraphData) {
      for (let item of data) {
        if (item.id === sectionId) {
          // 找到指定ID的章节，将新的段落添加到contents列表末尾
          item.contents = item.contents || []; // 确保contents是一个数组
          item.contents.push(paragraphData);
          return true; // 成功添加，返回true
        }
        // 如果当前章节有子章节，递归查找
        if (item.contents && item.contents.length > 0) {
          if (this.addElementToSection(item.contents, sectionId, paragraphData)) {
            return true; // 在子章节中成功添加，返回true
          }
        }
      }
      return false; // 没有找到指定ID的章节，返回false
    },
    async handleSectionInputSubmitted(data) {
      // 处理传递过来的数据
      console.log("receive data from ContentCollapse8:");
      console.log(data);
      const parent = this.data.find(item => item.id == data.id);
      console.log("parent:" + JSON.stringify(parent));
      let sectionData = {
        title: data.title,
        content: data.content,
      }
      console.log("sectionData:" + JSON.stringify(sectionData));
      let response = await addSection(data.title, data.content, parent.uuid, this.$route.params.uuid);
      console.log("addSection response:" + JSON.stringify(response));

      this.addElementToSection(this.data, parent.id, sectionData);
    },
    async downloadFile() {
      let response = await download(this.$route.params.uuid);
      const blob = new Blob([response.data], {type: response.headers['content-type']}); // 构造Blob对象
      const url = window.URL.createObjectURL(blob); // 创建URL对象
      const link = document.createElement('a'); // 创建a标签
      link.href = url;
      //link.setAttribute('download', "download.docx"); // 设置下载文件名
      document.body.appendChild(link); // 添加到DOM中
      link.click(); // 触发点击事件
      document.body.removeChild(link); // 移除DOM
    },
    handleShowProjectWayChange(value) {
      this.selectedShowProjectWay = value;
    },
  },
}
</script>

<style scoped>
.project {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
}

.navigation {
  width: 250px;
}

.content {
  flex: 1;
}

.toolbar {
  text-align: center;
}
</style>
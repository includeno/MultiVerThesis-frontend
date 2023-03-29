<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <div class="navigation">
      <NavigationTree :data0="data0" @select="onSelect"/>
    </div>
    <!-- 右侧折叠面板内容区 -->
    <div class="content">
      <ContentDisplay :sections="data0" v-model:activeKey="currentActiveKeys"/>
    </div>
  </div>
</template>

<script>
import NavigationTree from '@/components/NavigationTree.vue';
import ContentDisplay from '@/components/ContentCollapse7.vue';

export default {
  name: 'CompletedView',
  components: {
    NavigationTree,
    ContentDisplay
  },
  mounted() {
    this.addIsLeafField(this.data0);
    console.log("data0:")
    console.log(this.data0)
  },
  data() {
    return {
      activeKeys: [], // 保存展开的面板项的key值
      targetKey: null,
      currentActiveKeys:this.activeKeys,
      data0: [
        {
          title: 'Chapter 1',
          type: 'section',
          id: 1,
          isLeaf: false,
          contents: [
            {
              title: 'Section 1.1',
              type: 'section',
              id: 2,
              isLeaf: false,
              contents: [] // Section 1.1的子内容
            }
          ]
        }
      ],
    };
  },
  methods: {
    onSelect(selectedKeys, {selectedNodes}) {
      // 实现导航栏选中事件的处理逻辑，例如快速定位
      // selectedKeys为选中节点的key，selectedNodes为选中节点信息
      if (selectedKeys.length > 0) {
        const targetId = selectedNodes[0].id; // 获取选中节点的ID
        this.targetKey = targetId;
        console.log("targetId:" + targetId)
        let path=this.findPathById(this.data0,targetId,[])
        console.log("target path:" + path)
        this.openPath(path);
        const targetElement = document.getElementById(targetId);
        console.log("targetElement:" + JSON.stringify(targetElement))
        if (targetElement) {
          targetElement.scrollIntoView({behavior: 'smooth'}); // 平滑滚动到目标元素
        }
      }
    },
    addIsLeafField(data) {
      if (Array.isArray(data)) {
        data.forEach(item => this.addIsLeafField(item));
      } else if (typeof data === 'object' && data !== null) {
        // 根据type属性值设置isleaf字段
        data.isLeaf = data.type === 'section' ? false : true;
        // 如果存在contents字段，则递归处理contents字段
        if (Array.isArray(data.contents)) {
          this.addIsLeafField(data.contents);
        }
      }
    },
    // findPathById 用于查找指定 id 的路径
    // 参数：
    // - data：待查找的树形结构数据
    // - targetId：要查找的目标 id
    // - path：递归查找时记录的路径数组（初始化为空数组）
    // 返回值：
    // - 如果找到目标 id，返回对应的路径数组（例如：[1, 2]）
    // - 如果未找到目标 id，返回 null
    findPathById(data, targetId, path = []) {
      // 遍历数据项
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const currentPath = path.concat(item.id); // 记录当前路径
        if (item.id === targetId) {
          // 如果找到目标 id，返回当前路径
          return currentPath;
        }
        // 如果当前节点包含子节点，递归查找子节点
        if (item.contents && item.contents.length > 0) {
          const subPath = this.findPathById(item.contents, targetId, currentPath);
          if (subPath) {
            // 如果在子节点中找到目标 id，返回对应的路径
            return subPath;
          }
        }
      }
      // 未找到目标 id，返回 null
      return null;
    },
    openPath(path) {
      this.activeKeys = path;
      console.log("ParentComponent.vue");
      console.log(this.activeKeys);
    },
    updateKeys(keys) {
      this.activeKeys = Array.from(new Set([...this.activeKeys, ...keys]));
      this.$emit("updateKeys", this.activeKeys);
    },
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
      console.log("CompletedViewV1.vue update: newActiveKeys"+newActiveKeys);
    }
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

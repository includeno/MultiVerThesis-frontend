<template>
  <div class="modal-overlay" v-if="showDialog">
    <div class="modal-content">
      <h3>添加新段落</h3>
      <label>标题：</label>
      <a-input v-model:value="inputTitle" type="text"/>
      <label>内容：</label>
      <a-input v-model:value="inputContent" type="text"/>
      <div class="buttons">
        <a-button @click="submitData">提交</a-button>
        <a-button @click="closeDialog">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputParagraphDialog",
  props: {
    showDialog: Boolean,
    parentId: String,
  },
  data() {
    return {
      inputTitle: '',
      inputContent: '',
    };
  },
  methods: {
    submitData() {
      // 触发自定义事件，将数据传递给父组件
      console.log(this.title);
      console.log(this.content);
      this.$emit('submit-paragraph-input', {title: this.title, content: this.content, id: this.parentId});
      // 清空输入框
      this.inputTitle = '';
      this.inputContent = '';
    },
    closeDialog() {
      // 触发自定义事件，通知父组件关闭对话框
      this.$emit('close-paragraph-dialog');
      // 清空输入框
      this.inputTitle = '';
      this.inputContent = '';
    },

  },
  computed: {
    title() {
      return this.inputTitle;
    },
    content() {
      return this.inputContent;
    }
  }
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 100%;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
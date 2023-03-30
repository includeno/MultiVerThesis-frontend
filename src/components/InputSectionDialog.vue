<template>
  <div class="modal-overlay" v-if="showDialog">
    <div class="modal-content">
      <h3>添加新节</h3>
      <label>标题：</label>
      <input v-model="inputTitle" type="text" />
      <div class="buttons">
        <button @click="submitData">提交</button>
        <button @click="closeDialog">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"InputSectionDialog",
  props: {
    showDialog: Boolean,
  },
  data() {
    return {
      inputTitle: '',
    };
  },
  methods: {
    submitData() {
      // 触发自定义事件，将数据传递给父组件
      this.$emit('submit-section-input', { title: this.inputTitle });
      // 清空输入框
      this.inputTitle = '';
    },
    closeDialog() {
      // 触发自定义事件，通知父组件关闭对话框
      this.$emit('close-section-dialog');
    },
  },
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
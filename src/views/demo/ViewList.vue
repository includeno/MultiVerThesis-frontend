<template>
  <div>
    <a-checkbox-group v-model="checkedList" @change="onChange">
      <a-checkbox v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value">
        {{ item.label }}
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Checkbox } from 'ant-design-vue';

export default defineComponent({
  components: {
    'a-checkbox': Checkbox,
    'a-checkbox-group': Checkbox.Group
  },
  data() {
    return {
      options: [
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' },
        { label: '西瓜', value: 'watermelon' }
      ],
      checkedList: []
    };
  },
  methods: {
    onChange(checkedValues) {
      console.log('选中的值：', checkedValues);
    }
  }
});
</script>
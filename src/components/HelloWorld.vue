<template>
  <div lass="hello">
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
    <p>{{ plusOne }}</p>
    <p>{{ plusName }}</p>
    <div>{{ data.foo }}</div>
    <a-button @click="onClick">good方法</a-button>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  watchEffect,
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  onUnmounted
} from 'vue';

export default defineComponent({
  name: 'Home',
  props: {
    msg: String
  },
  setup(props, context) {
    watchEffect(() => {
      console.log(`name is: ` + props.msg);
    });
    const plusOne = computed(() => count.value + 1);
    let plusName = computed({
      get: () => data.name + '：我是你爸爸',
      set: (v: string) => (data.name = v)
    });
    const count = ref<number>(12345678);
    const data = reactive({
      name: '',
      foo: 'vue  composition api'
    });
    function onClick() {
      context.emit('good', '陈家敬');
    }
    onMounted(() => {
      console.log('mounted!');
    });
    onUpdated(() => {
      console.log('updated!');
    });
    onUnmounted(() => {
      console.log('unmounted!');
    });

    // 暴露给模板
    return {
      count,
      plusOne,
      plusName,
      data,
      onClick
    };
  }
});
</script>

<style lang="less" scoped>
.hello {
  width: 500px;
  color: #fff;
  background: #ccc;
  margin: 20px 0;
}

h3 {
  margin: 40px 0 0;
}
</style>

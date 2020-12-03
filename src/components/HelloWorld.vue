<template>
  <div ref="root" lass="hello">
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
    <p>{{ plusOne }}</p>
    <p>{{ plusName }}</p>
    <div>{{ data.foo }}</div>
    <a-button @click="onClick">good方法</a-button>
    <a-button @click="onAddCount">监听watch</a-button>
    <p>{{ countRef }}</p>
    <div v-for="(item, i) in list" :key="i" :ref="el => (divs[i] = el)">
      {{ item }}
    </div>
    <hr />
    <div>
      <p>vuex计数器：{{ state.count }}</p>
      <a-button @click="onAddIncrement">按钮</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from '@/store';
import {
  ref,
  reactive,
  watchEffect,
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  onUnmounted,
  watch,
  onBeforeUpdate,
  toRef
} from 'vue';
import { useStore } from 'vuex';

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
    const count = ref<number>(1000);
    const root = ref(null);
    const data = reactive({
      count: 0,
      name: '傻逼',
      foo: 'vue  composition api'
    });
    const countRef = toRef(data, 'count');
    const onClick = () => {
      context.emit('good', '陈家敬');
    };
    const onAddCount = () => {
      data.count += 1;
      count.value += 1;
    };
    // 同时监听多个
    watch([count, () => data.count], ([count1, count2], [prevCount1, prevCount2]) => {
      console.log(count1, '-', prevCount1);
      console.log(count2, '-', prevCount2);
    });
    const list = reactive([1, 2, 3]);
    const divs = ref([]);
    // 获取 vuex 实例
    const store = useStore<RootState>();
    const { state, commit } = store;
    // 写法1
    const onAddIncrement = () => {
      commit('increment', 100);
    };

    onMounted(() => {
      console.log('mounted!');
      // 在渲染完成后, 这个 div DOM 会被赋值给 root ref 对象
      console.log(root.value); // <div/>
    });
    // 确保在每次变更之前重置引用
    onBeforeUpdate(() => {
      divs.value = [];
    });
    onUpdated(() => {
      console.log('updated!');
    });
    onUnmounted(() => {
      console.log('unmounted!');
    });

    // 暴露给模板
    return {
      root,
      count,
      plusOne,
      plusName,
      data,
      onClick,
      onAddCount,
      list,
      divs,
      countRef,
      state,
      onAddIncrement
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

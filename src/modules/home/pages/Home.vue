<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div>
      <a-button type="primary" @click="add">+</a-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a-button type="primary" @click="de">-</a-button>
    </div>
    <hr />
    <div>
      <a-button type="primary" @click="addAsync">async+</a-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a-button type="primary" @click="deAsync">async-></a-button>
    </div>
    <div>
      <p>{{ count }}</p>
      <hr />
      <p>{{ countGetters }}</p>
    </div>
    <HelloWorld :msg="'测试vuex'" @good="onGood"></HelloWorld>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState({ count: state => state.count }),
    ...mapGetters({
      countGetters: 'countGetters'
    })
  },
  mounted() {
    window.apis.getUserInfo({ params: { id: 333 } }).then(res => {
      console.log(res, '======');
    });
    console.log(this.increment);
  },
  methods: {
    ...mapMutations({
      increment: 'increment',
      decrement: 'decrement'
    }),
    ...mapActions({
      incrementAsync: 'incrementAsync',
      decrementAsync: 'decrementAsync'
    }),
    add() {
      this.increment(1);
    },
    addAsync() {
      this.incrementAsync(1000).then(res => {
        console.log('异步增加后的值为：', res);
      });
    },
    de() {
      this.decrement(1);
    },
    deAsync() {
      this.decrementAsync(1000).then(res => {
        console.log('异步减少后的值为：', res);
      });
    },
    onGood(str) {
      window.alert('我是你爸爸' + str);
    }
  }
};
</script>

<style scoped lang="less">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  min-width: 50px;
  height: 30px;
  cursor: pointer;
}
</style>

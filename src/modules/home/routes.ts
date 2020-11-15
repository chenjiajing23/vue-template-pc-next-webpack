import { RouteRecordRaw } from 'vue-router';
const Home = () => import('./pages/Home.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
];

export default routes;

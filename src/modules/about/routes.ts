import { RouteRecordRaw } from 'vue-router';
const About = () => import('./pages/About.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

export default routes;

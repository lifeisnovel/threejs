import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import Menu from "@/components/Menu";
import GENUARY272022 from "@/components/GENUARY272022";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {path: '/', component: Menu},
  {path: '/genuary272022', component: GENUARY272022}
];

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

export default {
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
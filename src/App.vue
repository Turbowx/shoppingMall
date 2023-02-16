<template>
  <div id="app">
    <Head></Head>
    <router-view></router-view>
    <Footer v-if="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Head from "./components/Head/index.vue";
import Footer from "./components/Foot/index.vue";
export default {
  name: "App",
  components: {
    Head,
    Footer,
  },
  mounted() {
    //派发一个action
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  width: 100%;
}
</style>

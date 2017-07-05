<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <head-view></head-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeadView from './components/head.vue'
export default {
  name: 'app',
  components:{
    HeadView
  }
}
</script>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>


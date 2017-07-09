<template>
    <!-- 主界面 入口-->
  <div>
    <!--<head-line></head-line>-->
    <!--<el-row>-->
      <!--<el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>-->
    <!--</el-row>-->
    <head-view></head-view>
    <router-view></router-view>
  </div>
</template>

<!--<style scoped>-->
  <!--body{-->
    <!--margin: 0;-->
    <!--padding: 0;-->
  <!--}-->

<!--</style>-->

<script>
  import HeadView from './head.vue'
  export default {
    components:{
      HeadView
    }
  }
</script>

<!--<script>-->
<!--//  import HeadLine from './head.vue'-->
<!--//  import ContentMain  from ''-->
  <!--export default {-->
<!--//    components: {-->
<!--//      HeadLine-->
<!--//    }-->
  <!--}-->
<!--</script>-->

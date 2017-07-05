<template>
    <!-- 导航 房卡 代理 玩家 系统消息 版本控制-->
  <div>
    <el-row>
      <el-col :span="18" :push="3">
        <el-tabs type="border-card">
          <el-tab-pane label="房卡 19000">
            <!--用户管理-->
            <left-menu></left-menu>
          </el-tab-pane>
          <el-tab-pane label="代理 20">配置管理</el-tab-pane>
          <el-tab-pane label="玩家 200000">角色管理</el-tab-pane>
          <el-tab-pane label="系统消息">定时任务补偿</el-tab-pane>
          <el-tab-pane label="版本控制">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<style>
  body{
    margin: 0;
    padding: 0;
  }
</style>

<script>
  import LeftMenu from './left_menu.vue'
  export default {
    components:{
      LeftMenu,
    }
  }
</script>

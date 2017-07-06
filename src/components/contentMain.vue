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
          <el-tab-pane label="代理 20">
            <!--配置管理-->
            <proxy-menu></proxy-menu>
          </el-tab-pane>
          <el-tab-pane label="玩家 200000">
            <!--角色管理-->
            <player-menu></player-menu>
          </el-tab-pane>
          <el-tab-pane label="系统消息">
            <!--定时任务补偿-->
            <system-menu></system-menu>
          </el-tab-pane>
          <el-tab-pane label="版本控制">
            <!--定时任务补偿-->
            <version-menu></version-menu>
          </el-tab-pane>
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
  import ProxyMenu from './proxy_menu.vue'
  import PlayerMenu from './player_menu.vue'
  import SystemMenu from './system_menu.vue'
  import VersionMenu from './verson_menu.vue'
  export default {
    components:{
      LeftMenu,
      ProxyMenu,
      PlayerMenu,
      SystemMenu,
      VersionMenu
    }
  }
</script>

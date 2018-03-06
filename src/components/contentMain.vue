<template>
    <!-- 导航 房卡 代理 玩家 系统消息 版本控制-->
  <div class="body-height">
    <el-row>
      <el-col :span="18" :push="3">
        <el-tabs type="border-card">
          <el-tab-pane label="管理员信息 ">
            <!--用户管理-->
            <left-menu></left-menu>
          </el-tab-pane>
          <!--<el-tab-pane label="代理 ">-->
            <!--&lt;!&ndash;配置管理&ndash;&gt;-->
            <!--<proxy-menu></proxy-menu>-->
          <!--</el-tab-pane>-->
          <el-tab-pane label="玩家 ">
            <!--角色管理-->
            <player-menu></player-menu>
          </el-tab-pane>
          <el-tab-pane label="系统消息">
            <!--定时任务补偿-->
            <system-menu></system-menu>
          </el-tab-pane>
          <!--<el-tab-pane label="版本控制">-->
            <!--&lt;!&ndash;定时任务补偿&ndash;&gt;-->
            <!--<version-menu></version-menu>-->
          <!--</el-tab-pane>-->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .body-height{
    min-height: 600px;
    max-height: 800px;
  }
</style>

<script>
  import LeftMenu from './left_menu.vue'
//  import ProxyMenu from './proxy_menu.vue'
  import PlayerMenu from './player_menu.vue'
  import SystemMenu from './system_menu.vue'
//  import VersionMenu from './verson_menu.vue'
  export default {
    components:{
      LeftMenu,
//      ProxyMenu,
      PlayerMenu,
      SystemMenu,
//      VersionMenu
    }
  }
</script>

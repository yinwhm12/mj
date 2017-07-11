<template>
  <!--添加 黑名单弹出框-->
  <div>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple-light">
          <span class="black-head black-font">拉入黑名单</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="player"
          style="width: 100%">
          <!--<template v-for="(title,index) in clickedMenu">-->
          <el-table-column
            prop="image"
            label="头像"
            width="125">
          </el-table-column>
          <el-table-column
            prop="id"
            label="玩家ID"
            width="148">
          </el-table-column>
          <el-table-column
            prop="nick_name"
            label="昵称"
            width="140">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="80"> ===1 ? "男":"女"
            <template scope="scope">
              <p>{{scope.row.sex ===1 ? "男":"女"}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="game_point"
            label="游戏积分"
            width="100">
          </el-table-column>
          <el-table-column
            prop="used_room_cards"
            label="房卡消耗"
            width="100">
          </el-table-column>
          <el-table-column
            prop="bought_room_cards"
            label="历史购卡/张"
            width="120">
          </el-table-column>
          <el-table-column
            prop="game_record"
            label="游戏记录"
            width="100">
          </el-table-column>
          <el-table-column
            prop="is_proxy"
            label="代理"
            width="125">
            <template scope="scope">
              <p>{{scope.row.is_proxy ===1 ? "一级代理":2 ? "二级代理":"否"}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="last_game_time"
            label="最后一次登录"
            width="200">
            <template scope="scope">
              <p>{{scope.row.last_game_time | stampToTimeFull}}</p>
            </template>
          </el-table-column>

          <!--</template>-->
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 0px;
    min-height: 36px;
    /*line-height: inherit;*/
    /*white-space:nowrap;*/
  }
  .black-head{
    display: inline-block;
    line-height: 50px;
    vertical-align:middle;
    width: 100px;
  }
  .black-font{
    color: #20A0FF;
    font-size: x-large;
    margin-left: 40%;
  }
</style>

<script>
  import util from '../utiljs/util'
  export default {
      props:["player_id"],
      data() {
          return {
              player: {},
          }
      },
    methods: {
      getPlayerInfoById(){
          let url = '/player/getAPlayer/?id=' + this.player_id
          this.$http.get(url)
            .then((res =>{
                this.player = res.data
            }))
            .catch((err =>{
                this.$message({
                  message: '请确保输入的ID是有效的！',
                  type: 'warning'
                })
            }))
      }
    },
  }
</script>

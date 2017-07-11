<template>
    <!-- 玩家 页面-->
  <div>
    <el-row class="tac" type="flex" :gutter="10">
      <el-col :span="3">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
          <template v-for="(menu,index) in tableMenus">
            <el-menu-item :index="index.toString()"><i class="el-icon-message"></i>{{ menu }}</el-menu-item>
          </template>
        </el-menu>
      </el-col>

      <!-- 右侧内容 表格-->

      <el-col :span="24">
        <!--第一个菜单的内容-->
        <span v-if="menuIndex==0">
              <el-row>
                <el-col>
                  <el-tag type="primary" :hit="true">总人数 {{ playerCounts }}人</el-tag>
                  <el-tag type="success" :hit="true">在线人数 10,2000人</el-tag>
                  <el-tag type="warning" :hit="true">昨日新增 1,1000人</el-tag>
                </el-col>
              </el-row>
              <div style="margin: 8px 0;"></div>
          </span>

          <el-row>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入玩家ID"
                    icon="search"
                    v-model="input1"
                    size="small"
                    @keyup.enter.native="searchEvent"
                    :on-icon-click="handleIconClick">
                  </el-input>
                </el-col>
                  &nbsp;&nbsp;&nbsp;<el-button type="primary" size="small" @click="twoChoosePlayer">{{menuIndex == "1"?"添加黑名单":"查询"}}</el-button>
          </el-row>
        <div style="margin: 8px 0;"></div>

        <span v-if="menuIndex == 1">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple-light">
                <span class="black-head black-font">黑名单</span>
                <div style="width: 300px;height: 30px;float: right; display: inline-block;line-height: 50px">
                  <div style="width: 200px;">
                    <el-input
                      placeholder="请输入玩家ID"
                      icon="search"
                      v-model="input2"
                      size="small"
                      @keyup.enter.native="searchBadPlayerEvent"
                      :on-icon-click="handleIconClickBlack">
                    </el-input>
                  </div>
                  <!--&nbsp;<span style="width: 100px"><el-button type="primary" size="small">查询</el-button></span>-->
               </div>
              </div>
            </el-col>
          </el-row>
        </span>

        <!--<div style="margin: 8px 0;"></div>-->

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
        <div style="margin: 8px 0;"></div>
        <div class="block page-align">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-sizes="[2, 4, 6,8]"
            :page-size="pageInfo.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
          </el-pagination>
        </div>
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
  .page-align{
    text-align: center;
  }
</style>

<script>
  import {mapGetters} from 'vuex'
  import util from '../utiljs/util'

  export default {
    data() {
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        input1: '',//所有玩家界面 搜索框
        input2:'',// 黑名单界面 搜索框
        playerCounts: 0,
        creaseCounts:0,
        onlineCounts:0,
        clickedMenu: [],
        currentPage4: 4,
        player: [],
//        tableMenus: [],
        pageInfo: {
          currentPage: 1,
          limit: 2,
          offset: 0,
          total: 0,
        },
      };
    },
    computed:{
      ...mapGetters({
        tableMenus: 'getPlayerMenu',
        tableFirstTitle: 'getPlayerFirst',
//        tableSecondTitle: 'getProxySecond',
      })
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
        this.getPlayers(0)
//        console.log("page",this.pageInfo)
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        let offset = util.buildOffsetByPage(currentPage,this.pageInfo.limit)
        this.pageInfo.offset = offset
        this.getPlayers(currentPage)

      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
        this.pageInfo.total = 0
        if (this.menuIndex === '1'){
          this.getBadPlayers(0)
        }else{
          this.getPlayers(0)
        }
      },
      handleIconClick(ev) {
        this.twoChoosePlayer()
      },
      handleIconClickBlack(ev){
//        console.log(ev);
        this.getOneBadPlayer();
      },
      getPlayerCounts(){//总人数
        this.$http.get('/player/playerCount/')
          .then((res =>{
            this.playerCounts = res.data
          }))
      },
      getYesterdayCounts(){//昨天 增加的人数
        this.$http.get('/player/increaseCount/')
          .then((res =>{
            this.creaseCounts = res.data
          }))
      },
      getPlayers(page = 0){
        if (page === 0){
          this.pageInfo.offset = 0
          this.pageInfo.total = 0
        }
        let url = '/player/getAll/?offset=' + this.pageInfo.offset + '&limit=' + this.pageInfo.limit
        this.$http.get(url)
          .then((res =>{
            this.player = res.body.data
            this.pageInfo.total = res.body.total
          }))
      },
      searchEvent(){
        this.twoChoosePlayer();
      },
      twoChoosePlayer(){//判断是否是黑名单添加搜索 还是 普通搜索
        if(this.menuIndex === '1'){//添加 黑名单 搜索

        }else{
          this.getOnePlayer();
        }
      },
      getOnePlayer(){
        if (this.input1 === ''){
         this.$message({
           message: '请输入有效的玩家ID',
           type: 'warning'
         })
          return
        }
        let url = '/player/getOne/?id=' + this.input1
        this.$http.get(url)
          .then((res =>{
            this.player = res.body.data
            this.pageInfo.offset = 0
            this.pageInfo.total = res.body.total
          }))
          .catch((err =>{
            this.$message({
              message: '暂无该玩家ID信息',
              type: 'warning'
            })
          }))
      },

      getBadPlayers(page = 0){
        if (page === 0){
          this.pageInfo.offset = 0
          this.pageInfo.total = 0
        }
        let url = '/player/badPlayers/?offset=' + this.pageInfo.offset + '&limit=' + this.pageInfo.limit
        this.$http.get(url)
          .then((res =>{
            this.player = res.body.data
            this.pageInfo.total = res.body.total
          }))
      },
      searchBadPlayerEvent(){
        this.getOneBadPlayer()
      },
      getOneBadPlayer(){
        if (this.input2 === ''){
          this.$message({
            message: '请输入有效的玩家ID',
            type: 'warning'
          })
          return
        }
        let url = '/player/badPlayer/?id=' + this.input2
        this.$http.get(url)
          .then((res =>{
            this.player = res.body.data
            this.pageInfo.offset = 0
            this.pageInfo.total = res.body.total
          }))
          .catch((err =>{
            this.$message({
              message: '暂无该玩家ID信息',
              type: 'warning'
            })
          }))
      },
      loading(){
        this.menuIndex = '0'
        this.clickedMenu = this.tableFirstTitle
      }
    },
    mounted: function () {
      this.loading()
      this.getPlayerCounts()
      this.getPlayers(0)
    }
  }
</script>

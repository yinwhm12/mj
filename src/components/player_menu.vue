<template>
    <!-- 玩家 页面-->
  <div>
    <el-row class="tac" type="flex" :gutter="10">
      <el-col :span="3">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
          <template v-for="(menu,index) in tableMenus">
            <el-menu-item :index="index.toString()">{{ menu }}</el-menu-item>
          </template>
        </el-menu>
      </el-col>

      <!-- 右侧内容 表格-->

      <el-col :span="24">
        <!--第一个菜单的内容-->
        <!--<span v-if="menuIndex==0">-->
              <!--<el-row>-->
                <!--<el-col>-->
                  <!--<el-tag type="primary" :hit="true">总人数 {{ playerCounts }}人</el-tag>-->
                  <!--<el-tag type="success" :hit="true">在线人数 10,2000人</el-tag>-->
                  <!--<el-tag type="warning" :hit="true">昨日新增 1,1000人</el-tag>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <!--<div style="margin: 8px 0;"></div>-->
          <!--</span>-->

        <span v-if="menuIndex == 2">
          <el-row>
                <el-col :span="6">
                  <el-input
                    placeholder="请输入玩家ID"
                    icon="search"
                    v-model="input1"
                    size="small"
                    @keyup.enter.native="searchEvent"
                    :on-icon-click="handleIconClick">
                  </el-input>
                </el-col>
                  &nbsp;&nbsp;&nbsp;<el-button type="primary" size="small" @click="twoChoosePlayer">划转玩家</el-button>
          </el-row>
        </span>
        <div style="margin: 8px 0;"></div>

        <!--<span v-if="menuIndex == 1">-->
          <!--<el-row>-->
            <!--<el-col>-->
              <!--<div class="grid-content bg-purple-light">-->
                <!--&lt;!&ndash;<span class="black-head black-font">黑名单</span>&ndash;&gt;-->
             <!--&lt;!&ndash;写入要操作的 玩家 划转金币 钻石&ndash;&gt;-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</span>-->

        <!--<div style="margin: 8px 0;"></div>-->
      <span v-if="menuIndex == 0 || menuIndex == 1">

        <el-row>
          <el-col :span="24">
            <el-table
              :data="player"
              style="width: 100%">
              <!--<template v-for="(title,index) in clickedMenu">-->
                <el-table-column
                  prop="image"
                  label="头像"
                  width="80">
                  <template slot-scope="scope">
                    <span v-if="scope.row.user_data">
                      <img :src="scope.row.user_data.head_img_url" style="width: 80px;height: 50px"/>
                    </span>
                  </template>
                </el-table-column>
              <el-table-column
                prop="id"
                label="游戏ID"
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.achievements">
                    {{ scope.row.achievements._id}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="nick_name"
                label="昵称"
                width="200">
                  <template slot-scope="scope">
                  <span v-if="scope.row.user_data">
                    {{ scope.row.user_data.nick_name}}
                  </span>
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="sex"-->
                <!--label="性别"-->
                <!--width="80"> ===1 ? "男":"女"-->
                <!--<template slot-scope="scope">-->
                  <!--<p>{{scope.row.sex ===1 ? "男":"女"}}</p>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                prop="game_point"
                label="上周贡献"
                width="190">
                <template slot-scope="scope">
                    <span v-if="scope.row.achievements">
                      {{ scope.row.achievements.achievements}}
                    </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="used_room_cards"
                label="上周佣金"
                width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.achievements">
                      {{ scope.row.achievements.commision}}
                    </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="bought_room_cards"
                label="代理人数"
                width="100">
                <template slot-scope="scope">
                      {{ scope.row.sons}}
                </template>
              </el-table-column>

                <el-table-column
                  prop="used_room_cards"
                  label="金币"
                  width="190">
                  <template slot-scope="scope">
                    <span v-if="scope.row.user_data">
                      {{ scope.row.user_data.gold}}
                    </span>
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="game_record"-->
                <!--label="游戏记录"-->
                <!--width="100">-->
                <!--<template slot-scope="scope">-->
                  <!--<span v-if="scope.row.game_record > 0">-->
                    <!--<el-button type="text" @click="gameRecords(scope.row.id)">{{scope.row.game_record}}</el-button>-->
                  <!--</span>-->
                  <!--<span v-else>-->
                    <!--{{scope.row.game_record}}-->
                  <!--</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="is_proxy"-->
                <!--label="代理"-->
                <!--width="125">-->
                <!--<template slot-scope="scope">-->
                  <!--<p>{{scope.row.is_proxy ===1 ? "一级代理":2 ? "二级代理":"否"}}</p>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="last_game_time"-->
                <!--label="最后一次登录"-->
                <!--width="200">-->
                <!--<template slot-scope="scope">-->
                  <!--<p>{{scope.row.last_game_time | stampToTimeFull}}</p>-->
                <!--</template>-->
              <!--</el-table-column>-->

              <!--</template>-->
            </el-table>
          </el-col>
        </el-row>
      </span>
        <div style="margin: 15px 0;"></div>
        <div class="block page-align" v-if=" menuIndex == 1">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.limit"
            layout="total, prev, pager, next, jumper"
            :total="pageInfo.total">
          </el-pagination>
        </div>

        <span v-if="menuIndex == 2">
          <div style="margin-top: 50px;margin-left: 50px" v-if="playerInfo.user_data !== undefined">
            <div style="display: flex;flex-direction: column;justify-content: flex-start;">
              <div style="display: inline-flex;flex-direction: row;align-items: flex-start;">
                <div style="width: 80px;height: 50px;"><img :src="playerInfo.user_data.head_img_url" style="width: 80px;height: 50px;"/></div>
                <div style="display: inline;flex-direction: column;align-items: flex-start;margin-left: 10px;">
                  <div>昵称: {{playerInfo.user_data.nick_name}}</div>
                  <div style="margin-top: 10px">游戏ID: {{input1}}</div>
                </div>
                <!--金币 钻石划转-->
                <div style="display: inline-flex;flex-direction: column;align-items: flex-start; margin-left: 30px">
                  <div style="display: inline-flex;flex-direction: row;align-items: flex-start;">
                    <div>金币划转:</div>
                    <div style="margin-left: 20px;"> <el-button type="primary" size="mini" round @click="assertAdd(1)">增加</el-button></div>
                    <div style="margin-left: 20px;"> <el-button type="warning" size="mini" round @click="assertDown(1)">减少</el-button></div>
                  </div>
                  <div style="display: inline-flex;flex-direction: row;align-items: flex-start;margin-top: 10px">
                    <div>钻石划转:</div>
                    <div style="margin-left: 20px;"> <el-button type="primary" size="mini" round @click="assertAdd(2)">增加</el-button></div>
                    <div style="margin-left: 20px"> <el-button type="warning" size="mini" round @click="assertDown(2)">减少</el-button></div>
                  </div>
                </div>
              </div>

              <!--金币以及 钻石-->
              <div style="display: inline-flex;flex-direction: row;align-items: flex-start;margin-top: 10px" v-if="playerInfo.achievement !== undefined">
                <div>上周总贡献度: {{playerInfo.achievement.achievements}}</div>
                <div style="margin-left: 30px">上周获得佣金: {{playerInfo.achievement.commision}}</div>
                <div style="margin-left: 30px">等级: {{playerInfo.achievement.degree}}</div>
              </div>

              <!--自己的金币-->
              <div style="display: inline-flex;flex-direction: row;align-items: flex-start;margin-top: 10px">
                <div>拥有金币: {{playerInfo.user_data.gold}}</div>
                <div style="margin-left: 30px">拥有钻石: {{playerInfo.user_data.diamond}}</div>
                <div style="margin-left: 30px">直推人数量: {{playerInfo.dears.length}}</div>
              </div>

              <!--直推人的情况-->
              <template v-for="item in playerInfo.dears">
                  <div style="display: inline-flex;flex-direction: column;align-items: flex-start;margin-top: 15px">
                    <div style="width: 50px;height: 30px"><img :src="item.head_img_url" style="width: 50px;height: 30px"/></div>
                    <div style="margin-left: 30px">昵称:{{item.nick_name}}</div>
                    <div style="margin-left: 30px">游戏ID:{{item.game_id}}</div>
                    <div style="margin-left: 30px">贡献度:{{item.assert}}</div>
                  </div>
              </template>
            </div>
          </div>
        </span>
      </el-col>

    </el-row>

    <!--<el-dialog-->
    <!--v-model="dialogVisible"-->
    <!--size="small">-->
    <!--<player-dialog :player_id="player_id"></player-dialog>-->
    <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--<el-button type="danger" @click="addBadPlayer">拉黑</el-button>-->
    <!--</div>-->
  <!--</el-dialog>-->

    <el-dialog
      v-model="boughtDialogVisible"
      size="mini">
      <bought-cards-dialog :buyer_id="buyer_id"></bought-cards-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="boughtDialogVisible = false" type="primary">确 定</el-button>
        <!--<el-button type="danger" @click="addBadPlayer">拉黑</el-button>-->
      </div>
    </el-dialog>

    <el-dialog
      v-model="gameRecordDialogVisible"
      size="large">
      <game-detail-dialog :player_id="player_id"></game-detail-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gameRecordDialogVisible = false" type="primary">确 定</el-button>
        <!--<el-button type="danger" @click="addBadPlayer">拉黑</el-button>-->
      </div>
    </el-dialog>
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
  import PlayerDialog from './addBadDialog.vue'
  import BoughtCardsDialog  from './boughtCardsDialog.vue'
  import GameDetailDialog from './gameDetialDialog.vue'

  export default {
    components:{
      PlayerDialog,
      BoughtCardsDialog,
      GameDetailDialog,
    },
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
        dialogVisible: false,
        boughtDialogVisible:false,
        gameRecordDialogVisible: false,
        buyer_id:'',
        player_id: '',
        player: [],
//        tableMenus: [],
        pageInfo: {
          currentPage: 1,
          limit: 8,
          offset: 0,
          total: 0,
        },
        playerInfo:{},
      };
    },
    computed:{
      ...mapGetters({
        tableMenus: 'getPlayerMenu',
        tableFirstTitle: 'getPlayerFirst',
//        tableSecondTitle: 'getProxySecond',
      })
    },
    watch:{

    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
//        this.getPlayers(0)
//        console.log("page",this.pageInfo)
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        let offset = util.buildOffsetByPage(currentPage,this.pageInfo.limit)
        this.pageInfo.offset = offset
//        this.getPlayers(currentPage)
        this.getPlayerByPage(currentPage);

      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
        this.pageInfo.total = 0;
        this.player = [];
        if (this.menuIndex === '0'){
//          this.getBadPlayers(0)
            this.input1 = '';
            this.playerInfo = {};
            this.getTenTopData(0);
        }else if(this.menuIndex === '1'){
          this.input1 = '';
          this.playerInfo = {};
//          this.getPlayers(0)
          this.getPlayerByPage(0);
        }else{
          //具体查询某个人

        }
      },
      handleIconClick(ev) {
//        this.twoChoosePlayer()
        this.getOnePlayer();
      },
      handleIconClickBlack(ev){
//        console.log(ev);
//        this.getOneBadPlayer();
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
//        this.twoChoosePlayer();
        this.getOnePlayer();
      },
      twoChoosePlayer(){//判断是否是黑名单添加搜索 还是 普通搜索
        if(this.menuIndex === '1'){//添加 黑名单 搜索
          this.player_id = this.input1
          this.dialogVisible = true
        }else{
          this.getOnePlayer();
        }
      },
      searchBadPlayerEvent(){
//        this.getOneBadPlayer()
      },
      loading(){
        this.menuIndex = '0'
        this.clickedMenu = this.tableFirstTitle
      },

      assertAdd(typeValue){
        if(typeValue === 1) {
          //增加金币
          this.$prompt('请输入要增加金币的数量', '提示金币增加', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[0-9]*$/,
            inputErrorMessage: '数量格式不正确!'
          }).then(({value}) => {
            let editData = {
              id:this.input1,
              value:parseInt(value),
              type:1
            };
            this.$http.put('/gamers/editGold/',JSON.stringify(editData))
              .then((res =>{
                this.$message({
                  type: 'success',
                  message: '成功增加的金额为: ' + value
                });
                this.getOnePlayer();
              }))
              .catch((err =>{
                this.$message({
                  type: 'error',
                  message: err.data
                });
              }))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          });
        }else if(typeValue === 2){
          //增加钻石
          this.$prompt('请输入要增加钻石的数量', '提示钻石增加', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[0-9]*$/,
            inputErrorMessage: '数量格式不正确!'
          }).then(({value}) => {
            let editData = {
              id:this.input1,
              value:parseInt(value),
              type:1
            };
            this.$http.put('/gamers/editDiamond/',JSON.stringify(editData))
              .then((res =>{
                this.$message({
                  type: 'success',
                  message: '成功增加的钻石为: ' + value
                });
                this.getOnePlayer();
              }))
              .catch((err =>{
                this.$message({
                  type: 'error',
                  message: err.data
                });
              }))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          });
        }else{
          this.$message({
            message:'请检查网络...',
            type:'warning'
          })
        }

      },
      assertDown(typeValue){
        if(typeValue === 1){
          //减少金币
          this.$prompt('请输入要减少金币的数量', '提示金币减少', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[0-9]*$/,
            inputErrorMessage: '数量格式不正确!'
          }).then(({value}) => {
            let editData = {
              id:this.input1,
              value:parseInt(value),
              type:2
            };
            this.$http.put('/gamers/editGold/',JSON.stringify(editData))
              .then((res =>{
                this.$message({
                  type: 'success',
                  message: '成功减少的金额为: ' + value
                });
                this.getOnePlayer();
              }))
              .catch((err =>{
                this.$message({
                  type: 'error',
                  message: err.data
                });
              }))

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          });
        }else if(typeValue === 2){
          //减少钻石
          this.$prompt('请输入要减少钻石的数量', '提示钻石减少', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[0-9]*$/,
            inputErrorMessage: '数量格式不正确!'
          }).then(({value}) => {
            let editData = {
              id:this.input1,
              value:parseInt(value),
              type:2
            };
            this.$http.put('/gamers/editDiamond/',JSON.stringify(editData))
              .then((res =>{
                this.$message({
                  type: 'success',
                  message: '成功减少的钻石为: ' + value
                });
                this.getOnePlayer();
              }))
              .catch((err =>{
                this.$message({
                  type: 'error',
                  message: err.data
                });
              }))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          });
        }else{
          this.$message({
            message:'请检查网络...',
            type:'warning'
          })
        }
      },

      //get ten top
      getTenTopData(){
        this.$http.get('/gamers/tenTop/')
          .then((res =>{
            this.player = res.data
          }))
          .catch((err =>{
            this.$message({
              message: '请检查网络!',
              type: 'warning'
            })
          }))
      },

      //get data by page
      getPlayerByPage(page = 0){
        if(page === 0){
          this.pageInfo.offset = 0;
          this.pageInfo.total = 0;
        }
        let url = '/gamers/gamers/?offset='+this.pageInfo.offset  + '&limit='+ this.pageInfo.limit;
        this.$http.get(url)
          .then((res =>{
            this.player = res.body.data;
            this.pageInfo.total = res.body.total;
          }))
          .catch((err =>{
            this.$message(err.data);
          }))
      },
      getOnePlayer(){
        if (this.input1 === ''||this.input1.length <= 0){
          this.$message({
            message:'输入合理的数据，进行搜索!',
            type:'warning'
          })
          return
        }
        let url = '/gamers/getOne/?id='+ this.input1;
        this.$http.get(url)
          .then((res =>{
            this.playerInfo = res.data;
            console.log('---------------user,',this.playerInfo)
          }))
          .catch((err =>{
            console.log('-------------err:',err.data)
            this.$message({
              message:'该玩家不存在',
              type:'warning'
            })
          }))
      }
    },
    mounted: function () {
      this.loading()
//      this.getPlayerCounts()
//      this.getPlayers(0)
      this.getTenTopData()
//      this.getOnePlayer();
    }
  }
</script>

<template>
    <!-- 代理界面 -->
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
            <div>
              <el-row>
                <el-col>
                  <el-tag type="primary" :hit="true"><el-button type="text" size="small" @click="classAll">所有代理 {{proxyCount.all}}人</el-button></el-tag>
                  <el-tag type="success" :hit="true"><el-button type="text" size="small" @click="classOne">一级代理 {{proxyCount.c_1}}人</el-button></el-tag>
                  <el-tag type="warning" :hit="true"><el-button type="text" size="small" @click="classTwo">二级代理 {{proxyCount.c_2}}人</el-button></el-tag>
                </el-col>
              </el-row>


              <div style="margin: 8px 0;"></div>

              <el-row>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入代理ID"
                    icon="search"
                    v-model="input1"
                    size="small"
                    :on-icon-click="handleOneClick">
                  </el-input>
                </el-col>
                  &nbsp;&nbsp;&nbsp;<el-button type="primary" size="small" @click="oneButton">查询</el-button>
              </el-row>

              <div style="margin: 8px 0;"></div>
              <span v-if="pageInfo.total <= 0">
                <el-row>
                  <el-col><p style="text-align: center;font-size: large">暂无该<span style="color: red">{{input1}}</span>玩家信息</p></el-col>
                </el-row>
              </span>
              <span v-else>
                <el-row>
                <el-col>
                  <el-table
                    :data="proxyData"
                    stripe
                    style="width: 100%"
                  >
                    <!--<template v-for="title in clickedMenu">-->
                      <el-table-column
                        prop="date"
                        label="加入时间"
                        width="180">
                        <template slot-scope="scope"><p>{{scope.row.join_proxy_time | stampToTimeFull}}</p></template>
                      </el-table-column>
                      <el-table-column
                        prop="date"
                        label="代理级别"
                        width="120">
                        <template slot-scope="scope">
                          <span v-if="scope.row.is_proxy === 1">
                            <el-button type="text" @click="showProxyBranch(scope.row.id)">一级代理</el-button>
                          </span>
                          <span v-else><p>二级代理</p></span>
                          <!--<p>{{scope.row.is_proxy == 1 ? "一级代理":"二级代理"}}</p>-->
                        </template>
                        </el-table-column>
                      <el-table-column
                        prop="id"
                        label="玩家ID"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="nick_name"
                        label="昵称"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="has_cards_count"
                        label="现持卡数"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        prop="bought_room_cards"
                        label="历史交易/张"
                        width="120">
                        <template slot-scope="scope">
                          <el-button type="text" @click="proxyCardsEvent(scope.row.id)">{{scope.row.bought_room_cards == 0 ? "d":"adf"}}</el-button>
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
              </span>
            </div>
          </span>

        <span v-else>
          <el-row>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入玩家ID"
                    icon="search"
                    v-model="input2"
                    size="small"
                    :on-icon-click="handleIconClick">
                  </el-input>
                </el-col>
                  &nbsp;&nbsp;&nbsp;<el-button type="primary" size="small" @click="twoButton">添加代理</el-button>
              </el-row>
              <div style="margin: 8px 0;"></div>
          <span v-if="searchData.length <= 0"></span>
          <span v-else>
              <el-row>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    <span class="black-head black-font">搜索结果</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-table
                    :data="searchData"
                    style="width: 100%">
                    <!--<template v-for="(title,index) in clickedMenu">-->
                    <el-table-column
                      prop="id"
                      label="玩家ID"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="nick_name"
                      label="昵称"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="has_cards_count"
                      label="现有房卡"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="is_proxy"
                      label="代理级别"
                      width="193">
                      <template slot-scope="scope"><p>{{scope.row.is_proxy == 1 ? "一级代理":2 ? "二级代理":"不是代理"}}
                        <el-button type="primary" size="small" @click="changeClass(scope.row.id)">更改</el-button>
                      </p></template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
          </span>
        </span>
      </el-col>

    </el-row>
      <el-dialog
        title="添加代理/修改代理"
        :visible.sync="dialogVisible"
        size="tiny">
        <!--<span>这是一段信息</span>-->
        <div style="text-align: center"><span style="color:#20A0FF; font-size: large">请选择:</span>
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="一级代理" value="1"></el-option>
            <el-option label="二级代理" value="2"></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeProxyClassEvent">确 定</el-button>
    </span>
      </el-dialog>

    <el-dialog
    v-model="branchDialogVisible"
    size="small">
      <proxy-branch-dialog :proxy_id="proxy_id"></proxy-branch-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="branchDialogVisible = false" type="primary">确 定</el-button>
        <!--<el-button type="danger" @click="addBadPlayer">拉黑</el-button>-->
      </div>
    </el-dialog>

    <el-dialog
      v-model="proxySoldDialogVisible"
      size="small">
      <proxy-sold-dialog :proxy_id="proxy_id"></proxy-sold-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="proxySoldDialogVisible = false" type="primary">确 定</el-button>
        <!--<el-button type="danger" @click="addBadPlayer">拉黑</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
  .page-align{
    text-align: center;
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
  import {mapGetters} from 'vuex'
  import util from '../utiljs/util'
  import ProxyBranchDialog  from './showProxyBranchDialog.vue'
  import ProxySoldDialog from './proxySoldCardsDialog.vue'
  export default {
    components:{
      ProxyBranchDialog,
      ProxySoldDialog
    },
    data() {
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        input1: '',
        input2:'',
        clickedMenu: [],
        pageInfo: {
          currentPage: 1,
          limit: 2,
          offset: 0,
          total: 0,
        },
        proxyCount:{
          all: 0,//所有代理数量
          c_1: 0,//代理一
          c_2: 0,//代理二
        },
        classProxy: 0,
        proxyData: [],
        searchData: [],
        dialogVisible: false,
        select: '',
        proxy_id: '',
        branchDialogVisible: false,
        proxySoldDialogVisible: false,
//        tableMenus: [],
      };
    },
    computed:{
      ...mapGetters({
        tableMenus: 'getProxyMenu',
        tableFirstTitle: 'getProxyFirst',
        tableSecondTitle: 'getProxySecond',
      })
    },
    methods: {
      proxyCardsEvent(id){//弹出 代理 历史交易卡
        this.proxySoldDialogVisible = true
        this.proxy_id = id
      },
//      一级代理
      showProxyBranch(id){
        console.log("idddddd0",id)
        this.proxy_id = id
        this.branchDialogVisible = true
      },
      changeProxyClassEvent(){
        if (this.select === ''){
          this.$message({
            message: '请选择代理级别',
            type: 'warning'
          })
        }else {
          this.$http.put('/proxy/changeClass/?id='+this.input2 +"&class="+this.select)
            .then((res =>{
              this.searchOne()
            }))
        }
        this.dialogVisible = false
      },
      changeClass(id){
        this.dialogVisible = true
      },
      classAll(){
        this.classProxy = 0
        this.getAllProxyInfo(0)
      },
      classOne(){
        this.classProxy = 1
        this.getAllProxyInfo(0)
      },
      classTwo(){
        this.classProxy = 2
        this.getAllProxyInfo(0)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
        this.getAllProxyInfo(0)
//        console.log("page",this.pageInfo)
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        let offset = util.buildOffsetByPage(currentPage,this.pageInfo.limit)
        this.pageInfo.offset = offset
        this.getAllProxyInfo(currentPage)
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
        this.input1 = ''
        this.input2 = ''
//        console.log(key === '2')
        switch (key) {
          case '1':
//            this.clickedMenu = this.tableSecondTitle
            this.searchData = []
            break;
          default :
//            this.clickedMenu = this.tableFirstTitle
            this.getProxyCount()
            this.classProxy = 0
            this.getAllProxyInfo(0)
            break;
        }
      },
      oneButton(){
        this.searchId()
      },
      twoButton(){
        this.searchOne()
      },
      handleOneClick(ev) {
        console.log(ev);
        this.searchId()
      },
      handleIconClick(ev) {
        console.log(ev);
        this.searchOne()
      },
      getProxyCount(){
        this.$http.get('/proxy/getProxyCount')
          .then((res =>{
            this.proxyCount = res.data
          }))
      },
      getAllProxyInfo(page = 0){
        if (page === 0){
          this.pageInfo.offset = 0
          this.pageInfo.total = 0
        }
        let url = '/proxy/showProxy/?class=' + this.classProxy + '&offset=' + this.pageInfo.offset + '&limit=' + this.pageInfo.limit
        this.$http.get(url)
          .then((res =>{
            this.proxyData = res.body.data
            this.pageInfo.total = res.body.total
          }))
          .catch((err =>{
            console.log("total---")
            this.pageInfo.total = 0
          }))
      },
      searchId(){
        if (this.input1 === ''){
          this.$message({
            message: '请输入有效的玩家ID',
            type: 'warning'
          })
          return
        }
        let url = '/proxy/searchId/?id='+ this.input1
        this.$http.get(url)
          .then((res=>{
            this.proxyData = res.body.data
            this.pageInfo.total = res.body.total
            this.pageInfo.offset = 0
          }))
          .catch((err =>{
            this.$message({
              message: '暂无该玩家ID信息',
              type: 'warning'
            })
            this.pageInfo.total = 0
          }))
      },
      searchOne(){//two search
        if (this.input2 === ''){
          this.$message({
            message: '请输入有效的玩家ID',
            type: 'warning'
          })
          return
        }
        let url = '/proxy/searchOne/?id='+ this.input2
        this.$http.get(url)
          .then((res=>{
            this.searchData = res.body.data
//            this.pageInfo.total = res.body.total
//            this.pageInfo.offset = 0
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
      this.getProxyCount()
      this.getAllProxyInfo(0)
    }
  }
</script>

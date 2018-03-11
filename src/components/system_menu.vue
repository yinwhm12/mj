<template>
    <!-- 系统消息界面-->

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

              <el-row>
                <el-col>
                  <div style="width: 100%;height: 50px;display: inline-block;">
                    <div class="block">
                      <span class="demonstration">时间:</span>
                      <el-date-picker
                        v-model="value6"
                        type="daterange"
                        @change="timeEvent"
                        placeholder="选择日期范围">
                      </el-date-picker>
                    </div>
                  </div>
                </el-col>
              </el-row>


        <el-row>
          <el-col>
              <div style="float: right"><el-button type="primary" size="small" @click="openDialog"><i class="el-icon-plus"></i>
              <span v-if="menuIndex == 0">添加公告</span>
              <span v-else>添加广播</span>
              </el-button></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              type="expand"
              height="80px">
                <el-table-column
                  prop="date"
                  :label="titleOne[Number(menuIndex)]"
                  width="180">
                  <template slot-scope="scope">
                    {{scope.row.create_time | stampToTimeFull}}
                  </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    :label="titleTwo[Number(menuIndex)]"
                    width="430">
                  <template slot-scope="scope">
                    {{scope.row.message}}
                  </template>
                  </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作"
                    width="180">
                  <template slot-scope="scope">
                    <el-button type="primary" size="small">已发布</el-button>
                    <!--<el-button type="primary" size="small">修改</el-button>-->
                    <el-button type="primary" size="small" @click="deleteEvent(scope.row._id)">删除</el-button>
                  </template>
                  </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div style="margin: 15px 0"></div>
        <div v-show="pageFlag">
        <!--<div v-show="true">-->
          <div class="block page-align">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.currentPage"
              :page-size="pageInfo.limit"
              layout="total, prev, pager, next, jumper"
              :total="pageInfo.total">
            </el-pagination>
          </div>
        </div>
      </el-col>

    </el-row>

    <el-dialog
      v-model="dialogVisible"
      size="tiny">
      <game-publish :whichOne="whichOne" @close="onEditClose"></game-publish>
    </el-dialog>
  </div>

</template>

<style scoped>
  .page-align{
    text-align: center;
  }
</style>


<script>
  import {mapGetters} from 'vuex'
  import GamePublish from './publish_game.vue'
  import util from '../utiljs/util'

  export default {
    components:{
      GamePublish,
    },
    data(){
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        value6: '',
        clickedMenu: [],
        dialogVisible: false,
        titleOne:['发布时间','广播时间'],
        titleTwo:['公告','广播'],
        whichOne: '0',
        tableData: [],
        pageInfo: {
          currentPage: 1,
          limit: 2,
          offset: 0,
          total: 0,
        },
        pageFlag: false,
      };
    },
    computed:{
      ...mapGetters({
        tableMenus: 'getSystemMenu',
        tableFirstTitle: 'getSystemFirst',
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
        this.whichOne = key
      },
      loading(){
        this.menuIndex = '0'
        this.clickedMenu = this.tableFirstTitle
//        let tt = 'iiiii';
//        console.log('----------------le',tt.length)
      },
      openDialog(){
        this.dialogVisible = true
      },
      onEditClose(needRefresh){
        if(needRefresh){
          //添加成功 需更新
          this.getAllPublishByPage(0);
        }
        this.dialogVisible = false
      },
      //删除公告
      deleteEvent(id){
        this.$http.delete('/announcement/:id='+id)
          .then((res =>{
            this.$message(res.data);
            if(this.value6.length === 2){
              this.getAllPublishByTimePage(this.pageInfo.currentPage);
              return
            }
            this.getAllPublishByPage(this.pageInfo.currentPage);
          }))
          .catch((err =>{
            this.$message(err.data)
          }))
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
//        this.getAllVersionInfo(0)
//        console.log("page",this.pageInfo)
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        let offset = util.buildOffsetByPage(currentPage,this.pageInfo.limit)
        this.pageInfo.offset = offset
        if( Array.isArray(this.value6)){
          if(this.value6.length ===2 && this.value6[0] !== null && this.value6[1] !== null){
            this.getAllPublishByTimePage(currentPage);
            return
          }
        }
        this.getAllPublishByPage(currentPage)

      },
      //获取所有的 初始加载
      getAllPublishByTimePage(page = 0){
        if(page === 0){
          this.pageInfo.offset = 0;
          this.pageInfo.total = 0;
        }
        let url = '/announcement/publicsByTime/';
        let jsonData = {
          offset: this.pageInfo.offset,
          limit: this.pageInfo.limit,
          before: Date.parse(this.value6[0])/1000,
          after: Date.parse(this.value6[1])/1000,
        };
        this.$http.post(url,JSON.stringify(jsonData))
          .then((res =>{
            this.tableData = res.body.data;
            this.pageInfo.total = res.body.total;
            if(this.pageInfo.total >0 ){
              this.pageFlag = true;
            }else{
              this.pageFlag = false;
            }
          }))
          .catch((err =>{
            this.$message(err.data)
          }))
      },
      getAllPublishByPage(page = 0){
        if(page === 0){
          this.pageInfo.offset = 0;
          this.pageInfo.total = 0;
        }
        let url = '/announcement/publics/?offset='+this.pageInfo.offset + '&limit='+ this.pageInfo.limit;
        this.$http.get(url)
          .then((res => {
            this.tableData = res.body.data;
            this.pageInfo.total = res.body.total;
            if(this.pageInfo.total >0 ){
              this.pageFlag = true;
            }
          }))
          .catch((err =>{
            this.$message(err.data);
          }))
      },
      isTimeEvent(){

      },

      timeEvent(){
        if(this.value6.length ===0 || this.value6.length !== 2){
          this.$message.error('输入的日期无法做处理!')
          return
        }
        if(this.value6[0] === null|| this.value6[1] === null){
          this.getAllPublishByPage(0);
          return
        }
        this.getAllPublishByTimePage(0);
      }
    },
    mounted: function () {
      this.loading()
      this.getAllPublishByPage(0);
    }
  }
</script>

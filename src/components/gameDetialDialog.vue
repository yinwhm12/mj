<template>
    <!-- 玩家游戏记录 详情-->
  <div>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple-light time-head">
          <span class="black-head black-font ">xxxxxx的游戏记录</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="房间号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="结果"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="局数">
          </el-table-column>
          <el-table-column
            prop="address"
            type="expand"
            label="局数">
            <game-detail ></game-detail>
          </el-table-column>
          <el-table-column
            prop="address"
            label="分数">
              <el-table-column
                prop="address"
                label="玩家1">
              </el-table-column>
              <el-table-column
                prop="address"
                label="玩家2">
              </el-table-column>
              <el-table-column
                prop="address"
                label="玩家3">
              </el-table-column>
              <el-table-column
                prop="address"
                label="玩家4">
              </el-table-column>
          </el-table-column>
          <el-table-column
            prop="address"
            label="游戏时间">
          </el-table-column>
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
  </div>
</template>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .title-head{
    float: right;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 0px;
    min-height: 36px;
    line-height: inherit;
    white-space:nowrap;
  }
  .black-head{
    display: inline-block;
    line-height: 50px;
    vertical-align:middle;
    width: 150px;
  }
  .time-head{
    text-align: center;
  }
  .black-font{
    color: #20A0FF;
    font-size: large;
    /*margin-left: 40%;*/
  }
  .page-align{
    text-align: right;
  }
</style>

<script>
  import util from '../utiljs/util'
  import GameDetail from './gameVSDialog.vue'
  export default{
    components:{
      GameDetail
    },
    data(){
      return{
        pageInfo: {
          currentPage: 1,
          limit: 2,
          offset: 0,
          total: 0,
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        which_id: ''
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
//        console.log("page",this.pageInfo)
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        let offset = util.buildOffsetByPage(currentPage,this.pageInfo.limit)
        this.pageInfo.offset = offset
      },
    },
  }
</script>

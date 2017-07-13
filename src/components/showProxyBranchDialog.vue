<template>
    <!-- 展示代理分支 的弹出框-->
  <div>
    <el-row align="middle">
      <el-col>
        <div class="grid-content bg-purple-light time-head">
          <span class="black-head black-font ">xxxxxx的代理分支</span>
        </div>
      </el-col>
    </el-row>
    <el-row align="middle">
      <el-col>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="加入时间"
            width="198">
          </el-table-column>
          <el-table-column
            prop="date"
            label="代理级别"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="玩家ID"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="200">
          </el-table-column>
          <el-table-column
            prop="date"
            label="昵称"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="200">
          </el-table-column>
          <el-table-column
            prop="date"
            label="持卡数量"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="历史交易/张"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="120">
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
        :page-sizes="[4,6,8]"
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
  export default {
    props: ['proxy_id'],
    data(){
      return{
        pageInfo: {
          currentPage: 1,
          limit: 4,
          offset: 0,
          total: 0,
        },
        tableData: [{
          date: '2016-05-02',
        }, {
          date: '2016-05-04',
        }, {
          date: '2016-05-01',
        }, {
          date: '2016-05-03',
        }],
      }
    },
    methods:{
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
        this.getAllSold(0)
      } ,
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        let offset = util.buildOffsetByPage(val,this.pageInfo.limit)
        this.pageInfo.offset = offset
      },
    },
  }
</script>

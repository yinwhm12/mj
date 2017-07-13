<template>
    <!--代理历史交易卡 弹出框-->
    <div>
      <el-row>
        <el-col :span="12">
          <!--<el-button :plain="true" type="primary" size="small">全部</el-button>-->
          <!--<el-button :plain="true" type="primary" size="small">售出</el-button>-->
          <!--<el-button type="primary" size="small">购入</el-button>-->
          <el-radio-group v-model="radio3" @change="radioEvent">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="售出"></el-radio-button>
            <el-radio-button label="购入"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="8">
            <div class="block title-head">
              <!--<span class="demonstration">默认</span>-->
              <el-date-picker
                v-model="value6"
                type="daterange"
                size="small"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
        </el-col>
        <el-col :span="4">
          <div><span>&nbsp;&nbsp;&nbsp;&nbsp;</span> <el-button type="primary" size="small">查询</el-button></div>
        </el-col>
      </el-row>
      <div style="margin: 10px 0; "></div>

      <el-row>
        <el-col>
          <div class="grid-content bg-purple-light time-head">
            <span class="black-head black-font ">xxxxxx的历史交易</span>
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
              label="交易时间"
              width="198">
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
              label="交易类型"
              :resizable="true"
              :show-overflow-tooltip="true"
              width="100">
            </el-table-column>
            <el-table-column
              prop="date"
              label="交易数量"
              :resizable="true"
              :show-overflow-tooltip="true"
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="交易状态"
              :resizable="true"
              :show-overflow-tooltip="true"
              width="100">
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
  export default{
    props: ['proxy_id'],
    data(){
      return{
        value6: '',
        radio3: '全部',
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
    watch:{
      proxy_id(){
        this.radio3 = "全部"
      }
    },
    methods:{
      radioEvent(){
        console.log("jjj",this.radio3)
      },
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

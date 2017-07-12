<template>
    <!-- 代理界面 点击历史交易 弹出框-->
  <div>
    <div>
      <el-row align="middle">
        <el-col>
          <div class="block time-head">
            <span class="demonstration">时间:</span>
            <el-date-picker
              v-model="time"
              @change="getTime"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
            <!--<span></span>-->
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 8px 0;"></div>
    <el-row align="middle">
      <el-col :span="24">
        <div class="grid-content bg-purple-light time-head">
          <span class="black-head black-font ">xxxxxx的历史购卡记录</span>
        </div>
      </el-col>
    </el-row>
    <el-row align="middle">
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="250">
          <el-table-column
            prop="date"
            label="购卡时间"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="购卡数量"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="状态"
            :resizable="true"
            :show-overflow-tooltip="true"
            width="180">
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
  .second-head{

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
    props:["buyer_id"],
    data(){
      return{
        time: '',
        soldData:[],
        timeStr: '',
        tableData: [{
          date: '2016-05-02',
        }, {
          date: '2016-05-04',
        }, {
          date: '2016-05-01',
        }, {
          date: '2016-05-03',
        }],
        pageInfo: {
          currentPage: 1,
          limit: 4,
          offset: 0,
          total: 0,
        },
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
        this.getAllSold(val)
      },
      getTime(){

        console.log("value-time",this.time)
        let dates = []
        if (this.time.length > 1) {
          if (this.time[0] !== null) {
            dates.push(this.time[0] / 1000)
          }
          if (this.time[1] !== null) {
            dates.push(this.time[1] / 1000)
          }
        }
        console.log("data==",dates)
        let ss = dates.join(",")
        this.timeStr = ss
        this.getAllSold(0)
        console.log("sss===",ss)
        console.log("sss===len",ss.length)
      },
      getAllSold(page = 0){
        if (page === 0){
          this.pageInfo.offset = 0
          this.pageInfo.total = 0
        }
        let urlTime = '/soldCards/getMySoldCards/?id='+ this.buyer_id + '&offset='+ this.pageInfo.offset + '&limit='+this.pageInfo.limit
        let url = ''
        if (this.timeStr === ''|| this.timeStr.length <=0){
          url = '/soldCards/getMySoldCards/?id='+ this.buyer_id + '&offset='+ this.pageInfo.offset + '&limit='+this.pageInfo.limit
        }else{
          url = '/soldCards/getMyTime/?id='+ this.buyer_id + '&offset='+ this.pageInfo.offset + '&limit='+this.pageInfo.limit + '&time=' + this.timeStr
        }
        this.$http.get(url)
          .then((res =>{
            this.soldData = res.body.dataset
            this.pageInfo.total = res.body.total
          }))
      },
    }

  }
</script>

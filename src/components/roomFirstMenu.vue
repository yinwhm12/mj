<template>
    <!--管理页面 页面里修改密码-->
  <div>
    <el-row>
      <el-col>
        <div class="block">
          <span class="demonstration">时间:</span>
          <el-date-picker
            v-model="value6"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
            <el-table-column
              prop="date"
              label="售卡时间"
              :resizable="true"
              :show-overflow-tooltip="true"
              width="180">
            </el-table-column>
            <el-table-column
                prop="date"
                label="玩家ID"
                :resizable="true"
                :show-overflow-tooltip="true"
                width="180">
              </el-table-column>
            <el-table-column
                prop="date"
                label="昵称"
                :resizable="true"
                :show-overflow-tooltip="true"
                width="180">
              </el-table-column>
            <el-table-column
                prop="date"
                label="代理级别"
                :resizable="true"
                :show-overflow-tooltip="true"
                width="180">
              </el-table-column>
            <el-table-column
                prop="date"
                label="售出数量"
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
    <div style="margin: 10px 0;"></div>
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
  .page-align{
    text-align: center;
  }
</style>

<script>
  import util from '../utiljs/util'
  export default{
    data(){
      return{
        tableData: [{
          date: '2016-05-02',
        }, {
          date: '2016-05-04',
        }, {
          date: '2016-05-01',
        }, {
          date: '2016-05-03',
        }],
        value6: '',
        pageInfo: {
          currentPage: 1,
          limit: 2,
          offset: 0,
          total: 0,
        },
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        let offset = util.buildOffsetByPage(currentPage,this.pageInfo.limit)
        this.pageInfo.offset = offset

      },
    },
  }
</script>

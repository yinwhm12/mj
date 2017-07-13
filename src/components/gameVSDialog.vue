<template>
    <!-- 游戏对局 数据表格-->
  <div>
    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="盘数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="时间"
            width="180">
          </el-table-column>
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
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default{
    data(){
      return {
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
        }]
      }
    },
    methods:{

    },

  }
</script>

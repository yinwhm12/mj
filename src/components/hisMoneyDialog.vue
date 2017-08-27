<template>
    <!-- 代理充值 账号信息界面-->
  <div>
    <el-row type="flex">
      <el-col :span="5" :offset="1">
        <div style="font-size: large">输入要充卡的代理ID: </div>
      </el-col>
      <el-col :span="8">
        <div> <el-input v-model="input" placeholder="请输入玩家ID"></el-input></div>
      </el-col>
      <el-col :span="9" :offset="1">
        <div><el-button type="primary">查 看</el-button></div>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="加入时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="代理级别"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="玩家ID">
          </el-table-column>
          <el-table-column
            prop="address"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="现持卡数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="历史交易/张">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div style="margin: 15px 0;"></div>
    <el-row>
      <el-col :span="5" :offset="7"><span style="line-height: inherit;font-size: large">输入要充值卡的数量:</span></el-col>
      <el-col :span="12"><div style="width: 200px"><el-input v-model="inputNumber" placeholder="请输入卡的数量"></el-input></div></el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
  </div>

</template>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }

</style>

<script>
  export default{
    data(){
      return{
        input: '',
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
        inputNumber: 0,
      }
    },
    methods:{

    }
  }
</script>

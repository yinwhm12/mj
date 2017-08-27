<template>
    <!--系统消息 游戏广播-->
  <div>
    <el-row>
      <el-col>
        <div style="width: 100%;height: 50px;display: inline-block;">
          <div class="block">
            <span class="demonstration">时间:</span>
            <el-date-picker
              v-model="value6"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
              <div style="float: right"><el-button type="primary" size="small"><i class="el-icon-plus"></i>添加公告</el-button></div>
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
            label="发布时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="公告"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作"
            width="250">
            <template scope="scope">
              <el-button type="primary" size="small">已发布</el-button>
              <el-button type="primary" size="small">修改</el-button>
              <el-button type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>


<script>
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
      }
    },
    methods:{

    },
  }
</script>

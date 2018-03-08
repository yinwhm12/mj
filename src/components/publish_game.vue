<template>
    <!-- 游戏公告 添加内容 界面-->
  <div>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple-light new-title">
          <span class="head-title">公告内容</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 20}"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 12px 0;"></div>
    <el-row>
      <el-col :span="8" :offset="4"><el-button type="primary" @click="OkButton">确定</el-button></el-col>
      <el-col :span="8" :push="4"><el-button type="primary" @click="close(false)">取消</el-button></el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 0px;
    min-height: 36px;
  }
  .new-title{
    text-align: center;
  }
  .head-title{
    width: auto;
    display: inline-block;
    line-height: 50px;
    font-size: large;
    color: #58B7FF;
  }
</style>

<script>
  export default{
    props:["whichOne"],
    data() {
      return {
        textarea: '',
      }
    },
    methods:{
      close(needRefresh = false){
//          console.debug()
        this.$emit('close', needRefresh)
      },
      OkButton(){
        if(this.textarea !== '')
      }
    }
  }
</script>

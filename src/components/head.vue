<template>
    <!--head-->
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <!--<img src="../assets/daozhou_logo.png" style="height: 55px;position: absolute;left: 22%"/><span style="font-family: 'Hiragino Sans GB'; font-size: 28px;position:absolute;left: 25.5%;top: 14px;">银滩道州麻将</span>-->
        <div><img src="../assets/daozhou_logo.png" style="height: 55px"/><span>银滩道州麻将</span></div>
        <!--<div><span>银滩道州麻将</span></div>-->
      </div>
    </el-col>
  </el-row>

</template>

<style scoped>
  body{
    padding: 0;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #58B7FF;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 58px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

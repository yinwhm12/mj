<template>
    <!--head-->
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <!--<img src="../assets/daozhou_logo.png" style="height: 55px;position: absolute;left: 22%"/><span style="font-family: 'Hiragino Sans GB'; font-size: 28px;position:absolute;left: 25.5%;top: 14px;">银滩道州麻将</span>-->
        <div class="head-middle">
         <div class="logo"><img src="../assets/daozhou_logo.png"/>
           <span class="logo-font" >银滩道州麻将</span>
           <div class="logo-user"><el-button :plain="true" type="warning" @click="loginOut"><i class="el-icon-information">lucky 退出</i></el-button></div>
         </div>
        </div>
        <!--<div><span>银滩道州麻将</span></div>-->
      </div>
    </el-col>
  </el-row>

</template>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .head-middle {
    width: 200px;
    /*background-color: #454544;*/
    /*margin: 0 auto;*/
    margin-left: 13%;
    white-space:nowrap;
  }
  .logo,.logo-font,.logo-user {
    display: inline-block;
    line-height: 50px;
    vertical-align:middle;
    width: 100px;
  }
  .logo{
    width: 50px;
    height: 55px;
  }
  .logo img{
    width: 100%;
    height: 100%;
    /*margin-left: 20px;*/
  }
  .logo-font{
    margin-left: 10px;
    margin-top: -35px;
    font-family: Hiragino Sans GB;
    font-size: x-large;
  }
  .logo-user{
    margin-left: 130px;
    margin-top: -35px;
    /*font-family: Hiragino Sans GB;*/
  }

  .el-button--warning.is-plain{
    background: #58B7FF;
    border: 0;
    /*color: ;*/
  }
  .el-row {
    margin-bottom: 0px;
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

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      loginOut(){
        sessionStorage.removeItem('token')
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<template>
    <!-- 账户信息 界面-->
    <div>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light">
          <div >
            <!--<el-row>-->
              <!--<el-col :offset="2">-->
                <!--<div style="margin-top: 15px"><span class="font-content">用 户 名:</span> {{user.name}}</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <el-row>
              <el-col :offset="2">
                <div style="margin-top: 30px"><span class="font-content">名称:</span> {{name}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2">
                <div style="margin-top: 30px">
                  <!--<span class="font-content">代理级别:</span> {{user.proxy_class == 1 ? "超级总代理":"普通总代理"}}-->
                  <span class="font-content">超级管理员</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2">
                <div style="margin-top: 50px;display: inline-flex;flex-direction: row;">
                  <div>
                    <span class="font-content">版权说明:</span>@东风棋牌团队开发组
                  </div>
                  <div style="margin-left: 70px">联系方式:xxxxx</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div></el-col>
      </el-row>
      <div style="margin: 15px 0;"></div>
      <!--<el-row>-->
        <!--<el-col :span="24"><div class="grid-content bg-purple-light">-->
          <!--<div >-->
            <!--<el-row>-->
              <!--<el-col :offset="2">-->
                <!--<div style="margin-top: 10px"><span class="font-content">剩余卡数:</span> {{user.left_cards}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="primary" size="small" @click="rechargeEvent">代理充卡</el-button></div>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
              <!--<el-col :offset="2">-->
                <!--<div style="margin-top: 17px"><span class="font-content">售出卡数:</span> {{user.sold_cards}}</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
              <!--<el-col :offset="2">-->
                <!--<div style="margin-top: 17px"><span class="font-content">充卡次数:</span> {{user.recharge_times}}</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</div>-->
        <!--</div></el-col>-->
      <!--</el-row>-->
      <el-dialog
      v-model="dialogVisible"
      size="small">
        <his-money></his-money>
        <div style="text-align: center">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmButton">充值</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="充值提示"
        :visible.sync="confirmDialog"
        size="tiny">
        <p>你向玩家ID:<span style="font-size: large;color: #F7BA2A">xxxxx</span>,充值<span style="font-size: large;color: red">1100</span> 张卡?</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmDialog = false">确定充值</el-button>
        </span>
      </el-dialog>
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
    border-radius: 4px;
    min-height: 180px;
  }
  .font-content{
    color: #58B7FF;
    /*font-size: large;*/
    font-weight: bold;
    font-family: Hiragino Sans GB;
  }
</style>

<script>
import HisMoney from './hisMoneyDialog.vue'
import cook from '../auth/cookie'
  export default {
  components:{
    HisMoney,
  },
    data() {
      return {
        user: {},
        dialogVisible: false,
        confirmDialog: false,
        name:'',
      }
    },
    mounted: function () {
//      this.getUserInfo()
      this.getloaclName();
    },
    methods: {
      getUserInfo(){
        this.$http.get('/user/')
          .then((res =>{
            this.user = res.data
            console.log("user",this.user)
          }))
      },
      rechargeEvent(){
        this.dialogVisible =true
      },
      confirmButton(){
//        alert("are sure ?")
        this.confirmDialog = true
//        var a = window.confirm("点击“确定”充值,点击“取消”返回操作");
//        if(a===true)
//        {alert('确定');}
//        else
//        {alert('删除');}
      },
      getloaclName(){
        let userInfo = cook.getCookie('daozhouUser');
        if(Boolean(userInfo) === false){
          this.name = '没登陆?';
        }else{
          let index = userInfo.indexOf('&');
          this.name = userInfo.substring(0,index) ;
        }
      }
    }
  }
</script>

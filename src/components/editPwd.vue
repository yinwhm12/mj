<template>
  <!-- 账户信息 修改密码-->
  <div>
    <el-row>
      <el-col :span="20"><div class="grid-content bg-purple-light">
        <div >
          <el-row>
            <el-col :offset="2">
              <div style="width: 520px;display: inline-flex;align-items: center;margin-top: 20px">
                  <span>
                    原始密码:
                  </span>
                <span style="margin-left: 10px;width: 300px">
                    <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                  </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <div style="width: 520px;display: inline-flex;align-items: center;margin-top: 20px">
                  <span>
                    新密码:
                  </span>
                <span style="margin-left: 10px;width: 300px">
                    <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                  </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
                <div style="width: 520px;display: inline-flex;align-items: center;margin-top: 20px">
                  <span>
                    再次确定新密码:
                  </span>
                  <span style="margin-left: 10px;width: 300px">
                    <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                  </span>
                </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div style="margin-left: 150px;margin-top: 30px;margin-bottom: 10px;">
                <el-button type="primary" size="large">保 存</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      </el-col>
    </el-row>
    <div style="margin: 15px 0;"></div>
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
  export default {
    components:{
      HisMoney,
    },
    data() {
      return {
        user: {},
        dialogVisible: false,
        confirmDialog: false,
        input:''
      }
    },
    mounted: function () {
//      this.getUserInfo()
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
      }
    }
  }
</script>

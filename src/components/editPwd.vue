<template>
  <!-- 账户信息 修改密码-->
  <div>
    <el-row>
      <el-col :span="20"><div class="grid-content bg-purple-light">
        <div >
          <el-row>
            <el-col :offset="2">
              <div style="width: 520px;display: inline-flex;align-items: center;margin-top: 50px">
                  <span>
                    原始密码:
                  </span>
                <span style="margin-left: 10px;width: 300px">
                    <el-input v-model="input" placeholder="请输入原始密码" size="small" type="password"></el-input>
                  </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <div style="width: 520px;display: inline-flex;align-items: center;margin-top: 30px">
                  <span>
                    新密码:
                  </span>
                <span style="margin-left: 10px;width: 300px">
                    <el-input v-model="input1" placeholder="请输入新密码" size="small" type="password"></el-input>
                  </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
                <div style="width: 520px;display: inline-flex;align-items: center;margin-top: 30px">
                  <span>
                    再次确定新密码:
                  </span>
                  <span style="margin-left: 10px;width: 300px">
                    <el-input v-model="input2" placeholder="再次确定新密码" size="small" type="password"></el-input>
                  </span>
                </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div style="margin-left: 150px;margin-top: 50px;margin-bottom: 20px;">
                <el-button type="primary" size="large" @click="savePwd">保 存</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      </el-col>
    </el-row>
    <div style="margin: 15px 0;"></div>

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
  export default {
    data() {
      return {
        input:'',
        input1:'',
        input2:'',
      }
    },
    mounted: function () {
//      this.getUserInfo()
    },
    methods: {
      savePwd(){
        if(this.input1.length ===0 || this.input2.length === 0 || this.input1 === '' || this.input2 === ''){
          this.$message({
            type:'warning',
            message:'新密码不能为空!'
          })
          return
        }
        if(this.input1 !== this.input2 ){
          this.$message({
            type:'warning',
            message:'两次输入的密码不正确!'
          })
          return
        }
        let pwdJson = {
          old_pwd: this.input,
          new_pwd: this.input1
        };
        this.$http.put('/user/editPwd/',JSON.stringify(pwdJson))
          .then((res =>{
            this.$message({
              type:'success',
              message:'修改成功!'
            });
            this.$router.push({path: '/login'})
          }))
          .catch((err =>{
            this.$message({
              type:'error',
              message:err.data
            });
          }))
      }
    }
  }
</script>

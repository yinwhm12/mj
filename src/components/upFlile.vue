<template>
  <div style="width: 200px">
    <el-upload
      class="avatar-uploader"
      action="http://upload-z2.qiniu.com"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :data="postData"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<style scoped>
  .avatar-uploader{
    border: 1px dashed #20a0ff;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader :hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #20a0ff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        imageUrl: '',
        postData:{
            token: ''
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        console.log("url:",this.imageUrl)
        console.log("file:",file)
        console.log("file.raw:",file.raw)

        console.log("success:",res)
//        返回图片的地址hash 或者key都可以
      },
      beforeAvatarUpload(file) {
          console.log("before upload:")
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.getUpFileToken(file)
        return isJPG && isLt2M;
      },
      getUpFileToken(file){
//          let t  = new Date()
//          let tt = new Date()
//            console.log("set:",tt.setDate(file.lastModified))
//          console.log("set-tostring:",tt.setDate(file.lastModified)).format('hhmmss').toString()
//          console.log("ttt:",t.format('YYYYMMddhhmmss').toString)
          let curr = moment().format('YYYYMMDDHHmmss').toString()
          let prefix = moment(file.lastModified).format('HHmmss').toString()
          let suffix = file.name
          let key = encodeURI(`${curr}_${prefix}${suffix}`)
          let data = new FormData()
          data.append('key',key)
          this.$http.get('/upfile/getToken',data)
            .then((res =>{
              console.log("respond--",res.data)
              this.postData.token = res.data
            }))
      },
      test(){
          console.log("mounted test")
      }
    },
    mounted:function () {
      this.test()
    }
  }
</script>

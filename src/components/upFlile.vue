<template>
  <div style="width: 200px">
    <el-upload
      class="avatar-uploader"
      action="//upload.qiniu.com"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
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
  export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);

        console.log("success:",res)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }

        return isJPG && isLt2M;
      },
      getUpFileToken(file){
          let curr = moment().format('YYYYMMDDHHmmss').toString()
          let prefix = moment(file.lastModified).format('HHmmss').toString()
          let suffix = file.name
          let key = encodeURI(`${curr}_${prefix}${suffix}`)
          let data = new FormData()
          data.append('key',key)
          this.$http.get('/upload/getToken',data)
            .then((res =>{

            }))
      }
    }
  }
</script>

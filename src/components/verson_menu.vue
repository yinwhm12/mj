<template>
    <!-- 版本控制页面-->

  <div>
    <el-row class="tac" type="flex" :gutter="10">
      <el-col :span="3">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
          <template v-for="(menu,index) in tableMenus">
            <el-menu-item :index="index.toString()"><i class="el-icon-message"></i>{{ menu }}</el-menu-item>
          </template>
        </el-menu>
      </el-col>

      <!-- 右侧内容 表格-->

      <el-col :span="24">

          <span v-if="menuIndex==0">
              <el-row>
                <el-col>
                  <div style="width: 100%;height: 50px;display: inline-block;">
                    <div class="block">
                      <span class="demonstration">时间:</span>
                      <el-date-picker
                        v-model="time"
                        @change="getTime"
                        type="daterange"
                        placeholder="选择日期范围">
                      </el-date-picker>
                      <!--<span></span>-->
                      <!--<div style="float:right;"><el-button type="primary" size="small">查询</el-button></div>-->
                    </div>
                  </div>
                  <!--&nbsp;&nbsp;&nbsp;<el-button type="primary" size="small">查询</el-button>-->
                </el-col>
              </el-row>

        <!--<div style="margin: 10px 0;"></div>-->
            <el-row>
              <el-col>
                <el-table
                  :data="versionData"
                  style="width: 100%">
                    <el-table-column
                      prop="date"
                      label="发布时间"
                      width="180">
                      <template slot-scope="scope">
                        <p>{{scope.row.created_time | stampToTimeFull}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="更新日记"
                        width="180">
                      </el-table-column>
                    <el-table-column
                        prop="address"
                        label="下载地址"
                        width="180">
                      </el-table-column>
                    <el-table-column
                        prop="date"
                        label="操作"
                        width="180">
                      <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="deleteVersion(scope.row.id)">删除</el-button>
                      </template>
                      </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <div style="margin: 15px 0"></div>
            <div class="block page-align">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageInfo.currentPage"
                  :page-sizes="[2, 4, 6,8]"
                  :page-size="pageInfo.limit"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageInfo.total">
                </el-pagination>
              </div>
          </span>
        <span v-else>
          <!--更新版本-->
          <div>
            <el-row>
              <el-col :span="19" :offset="2">
                <div class="grid-content bg-purple-light new-title">
                  <span class="head-title">更新版本</span>
                </div>
              </el-col>
            </el-row>
            <div style="margin: 10px 0;"></div>
            <el-row>
              <el-col :offset="2"><span>*填写版本日记<i class="el-icon-edit"></i>:</span></el-col>
            </el-row>
            <el-row>
              <div style="margin: 10px 0;"></div>
              <el-col :offset="2" :span="19">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 20}"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </el-col>
            </el-row>
             <div style="margin: 10px 0;"></div>
            <el-row>
              <el-col :offset="2"><span><i class="el-icon-caret-right"></i>版本下载链接:</span></el-col>
            </el-row>
             <div style="margin: 10px 0;"></div>
            <el-row>
              <el-col :span="19" :offset="2">
                <el-input v-model="inputAddress" placeholder="请输入版本下载链接地址"></el-input>
              </el-col>
            </el-row>
            <div style="margin: 15px 0;"></div>
            <el-row>
              <el-col :offset="10">
                <el-button type="primary" @click="publishEvent">发布新版本</el-button>
              </el-col>
            </el-row>
          </div>
        </span>
      </el-col>

    </el-row>

    <el-dialog
      title="删除提示"
      :visible.sync="confirmDialog"
      size="mini">
      <p>你是否确定要删除该条记录，确定，将永久删除!!!</p>
      <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDialog = false">取 消</el-button>
            <el-button type="danger" @click="confirmEvent">确定删除</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<style scoped>
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
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
  .page-align{
    text-align: center;
  }
</style>

<script>
  import {mapGetters} from 'vuex'
  import util from '../utiljs/util'
  export default {
    data() {
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        time: '',
        timeStr:'',
        textarea:'',
        inputAddress: '',
        version_id: '',
        clickedMenu: [],
        versionData:[],
        confirmDialog:false,
        pageInfo: {
          currentPage: 1,
          limit: 2,
          offset: 0,
          total: 0,
        },
      };
    },
    computed:{
      ...mapGetters({
        tableMenus: 'getVersionMenu',
        tableFirstTitle: 'getVersionFirst',
      })
    },
    methods: {
      confirmEvent(){
        this.$http.delete('/version/'+ this.version_id)
          .then((res =>{
            this.$message(res.data)
            this.getAllVersionInfo(this.pageInfo.currentPage)
          }))
        this.confirmDialog = false
      },
      publishEvent(){
        if (this.textarea === '' || this.inputAddress === ''){
          this.$message({
            message: '内容都不能为空!',
            type: 'warning'
          })
          return
        }else{
          let data = {
            "content": this.textarea,
            "address": this.inputAddress,
          }

          this.$http.post('/version/',JSON.stringify(data))
            .then((res =>{
                this.$message(res.data)
              this.textarea = ''
              this.inputAddress = ''
            }))
        }
      },
      deleteVersion(id){
        this.confirmDialog = true
        this.version_id = id
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageInfo.limit = val
        this.getAllVersionInfo(0)
//        console.log("page",this.pageInfo)
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        let offset = util.buildOffsetByPage(currentPage,this.pageInfo.limit)
        this.pageInfo.offset = offset
        this.getAllVersionInfo(currentPage)

      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
        if (key === '0'){
          this.getAllVersionInfo(0)
        }
      },
      getTime(){
        let dates = []
        if (this.time.length > 1) {
          if (this.time[0] !== null) {
            dates.push(this.time[0] / 1000)
          }
          if (this.time[1] !== null) {
            dates.push(this.time[1] / 1000)
          }
        }
        let ss = dates.join(",")
        this.timeStr = ss
        this.getAllVersionInfo(0)
      },
      getAllVersionInfo(page = 0){
        if (page === 0){
          this.pageInfo.offset = 0
          this.pageInfo.total = 0
        }
        let url = ''
        if (this.timeStr === ''|| this.timeStr.length <=0){
          url = '/version/getAllVersions/?offset='+ this.pageInfo.offset + '&limit='+ this.pageInfo.limit
        }else{
          url = '/version/getVersionsT/?offset='+ this.pageInfo.offset + '&limit='+ this.pageInfo.limit + '&time='+ this.timeStr
        }
        this.$http.get(url)
          .then((res =>{
            this.versionData = res.body.data
            this.pageInfo.total = res.body.total
          }))
      },
      loading(){
        this.menuIndex = '0'
        this.clickedMenu = this.tableFirstTitle
      }
    },
    mounted: function () {
      this.loading()
      this.getAllVersionInfo(0)
    }
  }
</script>

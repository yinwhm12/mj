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
                        v-model="value6"
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
                  :data="tableData"
                  stripe
                  style="width: 100%"
                  type="expand"
                  height="80px">
                  <template v-for="title in clickedMenu">
                    <el-table-column
                      prop="date"
                      :label="title"
                      width="180">
                    </el-table-column>
                  </template>
                </el-table>
              </el-col>
            </el-row>
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
            <div style="margin: 5px 0;"></div>
            <el-row>
              <el-col :offset="2"><span>*填写版本日记<i class="el-icon-edit"></i>:</span></el-col>
            </el-row>
            <el-row>
              <el-col :offset="2" :span="19">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 20}"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </el-col>
            </el-row>
             <div style="margin: 5px 0;"></div>
            <el-row>
              <el-col :offset="2"><span><i class="el-icon-caret-right"></i>版本下载链接:</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="19" :offset="2">
                <el-input v-model="input" placeholder="请输入版本下载链接地址"></el-input>
              </el-col>
            </el-row>
            <div style="margin: 5px 0;"></div>
            <el-row>
              <el-col :offset="10">
                <el-button type="primary">发布新版本</el-button>
              </el-col>
            </el-row>
          </div>
        </span>
      </el-col>

    </el-row>
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
</style>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        value6: '',
        textarea:'',
        input:'',
        clickedMenu: [],
        tableData: [{
          date: '2016-05-02',
        }, {
          date: '2016-05-04',
        }, {
          date: '2016-05-01',
        }, {
          date: '2016-05-03',
        }]
      };
    },
    computed:{
      ...mapGetters({
        tableMenus: 'getVersionMenu',
        tableFirstTitle: 'getVersionFirst',
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
      },
      loading(){
        this.menuIndex = '0'
        this.clickedMenu = this.tableFirstTitle
      }
    },
    mounted: function () {
      this.loading()
    }
  }
</script>

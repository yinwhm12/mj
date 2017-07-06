<template>
    <!-- 玩家 页面-->
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
        <!--第一个菜单的内容-->
        <span v-if="menuIndex==0">
              <el-row>
                <el-col>
                  <el-tag type="primary" :hit="true">总人数 20000人</el-tag>
                  <el-tag type="success" :hit="true">在线人数 10,2000人</el-tag>
                  <el-tag type="warning" :hit="true">昨日新增 1,1000人</el-tag>
                </el-col>
              </el-row>
              <div style="margin: 8px 0;"></div>
          </span>

          <el-row>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入玩家ID"
                    icon="search"
                    v-model="input2"
                    size="small"
                    :on-icon-click="handleIconClick">
                  </el-input>
                </el-col>
                  &nbsp;&nbsp;&nbsp;<el-button type="primary" size="small">查询</el-button>
          </el-row>
        <div style="margin: 8px 0;"></div>

        <span v-if="menuIndex == 1">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple-light">
                <span class="black-head black-font">黑名单</span>
                <div style="width: 300px;height: 30px;float: right; display: inline-block;line-height: 50px">
                  <div style="width: 200px;">
                    <el-input
                      placeholder="请输入玩家ID"
                      icon="search"
                      v-model="input2"
                      size="small"
                      :on-icon-click="handleIconClick">
                    </el-input>
                  </div>
                  <!--&nbsp;<span style="width: 100px"><el-button type="primary" size="small">查询</el-button></span>-->
               </div>
              </div>
            </el-col>
          </el-row>
        </span>

        <!--<div style="margin: 8px 0;"></div>-->

        <el-row>
          <el-col>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              type="expand"
              height="80px">
              <template v-for="title in clickedMenu">
                <el-table-column
                  prop="date"
                  :label="title"
                  width="124">
                </el-table-column>
              </template>
            </el-table>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
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
    border-radius: 0px;
    min-height: 36px;
    /*line-height: inherit;*/
    /*white-space:nowrap;*/
  }
  .black-head{
    display: inline-block;
    line-height: 50px;
    vertical-align:middle;
    width: 100px;
  }
  .black-font{
    color: #20A0FF;
    font-size: x-large;
    margin-left: 40%;
  }
</style>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        input2:'',
        clickedMenu: [],
//        tableMenus: [],
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
        tableMenus: 'getPlayerMenu',
        tableFirstTitle: 'getPlayerFirst',
//        tableSecondTitle: 'getProxySecond',
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
//        console.log(key === '2')
//        switch (key) {
//          case '1':
//            this.clickedMenu = this.tableSecondTitle
//            break;
//          default :
//            this.clickedMenu = this.tableFirstTitle
//            break;
//        }
      },
      handleIconClick(ev) {
        console.log(ev);
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

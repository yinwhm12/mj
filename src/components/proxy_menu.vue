<template>
    <!-- 代理界面 -->
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
                  <el-tag type="primary" :hit="true">所有代理 20人</el-tag>
                  <el-tag type="success" :hit="true">一级代理 10人</el-tag>
                  <el-tag type="warning" :hit="true">二级代理 10人</el-tag>
                </el-col>
              </el-row>


              <div style="margin: 8px 0;"></div>

              <el-row>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入代理ID"
                    icon="search"
                    v-model="input2"
                    size="small"
                    :on-icon-click="handleIconClick">
                  </el-input>
                </el-col>
                  &nbsp;&nbsp;&nbsp;<el-button type="primary" size="small">查询</el-button>
              </el-row>
          </span>

        <span v-else>
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
        </span>
        <div style="margin: 8px 0;"></div>

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
      </el-col>

    </el-row>
  </div>
</template>

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
        tableMenus: 'getProxyMenu',
        tableFirstTitle: 'getProxyFirst',
        tableSecondTitle: 'getProxySecond',
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.menuIndex = key
//        console.log(key === '2')
        switch (key) {
          case '1':
            this.clickedMenu = this.tableSecondTitle
            break;
//          case '2':
//            this.clickedMenu = this.tableThirdTitle
//            break;
//          case '3':
//            this.clickedMenu = this.tableFourthTitle
//            break;
          default :
            this.clickedMenu = this.tableFirstTitle
//            console.log("tttt--",this.clickedMenu)
            break;
        }
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      loading(){
//        console.log("tttt--",this.tableSecondTitle)
//        console.log("tttt--",this.tableThirdTitle)
//        console.log("tttt--",this.tableFourthTitle)
        this.menuIndex = '0'
        this.clickedMenu = this.tableFirstTitle
      }
    },
    mounted: function () {
      this.loading()
    }
  }
</script>

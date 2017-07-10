<template>
    <!-- 房卡左侧菜单 -->
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

          <span v-if="menuIndex!=0">
              <el-row>
                <el-col>
                  <div class="block">
                    <span class="demonstration">时间:</span>
                    <el-date-picker
                      v-model="value6"
                      type="daterange"
                      placeholder="选择日期范围">
                    </el-date-picker>
                    <!--<span></span>-->
                  </div>
                </el-col>
              </el-row>
          <!--</span>-->

          <div style="margin: 10px 0;"></div>

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
            <user-view></user-view>
          </span>

        </el-col>

    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import UserView from './user_info.vue'

  export default {
    components:{
      UserView,
    },
    data() {
      return {
        activeIndex: '0',
        menuIndex: '0',//被选中的 某项
        value6: '',
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
        tableMenus: 'getRoomMenu',
        tableFirstTitle: 'getRoomFirst',
        tableSecondTitle: 'getRoomSecond',
        tableThirdTitle: 'getRoomThird',
        tableFourthTitle: 'getRoomFourth',
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
          case '2':
            this.clickedMenu = this.tableThirdTitle
            break;
          case '3':
            this.clickedMenu = this.tableFourthTitle
            break;
          default :
            this.clickedMenu = this.tableFirstTitle
//            console.log("tttt--",this.clickedMenu)
            break;
        }
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

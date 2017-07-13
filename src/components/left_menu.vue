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

          <span v-if="menuIndex=== '1'">
            <first-menu></first-menu>
          </span>
          <span v-else-if="menuIndex === '2'">
            <second-menu></second-menu>
          </span>
          <span v-else-if="menuIndex === '3'">
            <fourth-menu></fourth-menu>
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
  import FirstMenu from './roomFirstMenu.vue'
  import SecondMenu from './secondMenu.vue'
  import FourthMenu from './fouthMenu.vue'

  export default {
    components:{
      UserView,
      FirstMenu,
      SecondMenu,
      FourthMenu,
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
        console.log(key === '0')
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
